# ml_app/ml_api/views.py

import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import InputSerializer, OutputSerializer, SavedPredictionSerializer
from .ml_model import predict
from .models import SavedPrediction
from drf_yasg.utils import swagger_auto_schema

logger = logging.getLogger(__name__)

class PredictionView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=InputSerializer,
        responses={
            200: OutputSerializer,
            400: 'Bad Request',
            500: 'Internal Server Error'
        }
    )
    def post(self, request, format=None):
        logger.info(f"Received prediction request: {request.data}")
        
        input_serializer = InputSerializer(data=request.data)
        if input_serializer.is_valid():
            try:
                prediction_results = predict(input_serializer.validated_data)
                
                rf_predictions = prediction_results['Random Forest']
                xgb_predictions = prediction_results['XGBoost']
                closest_rows = prediction_results['k-NN']

                prediction = {
                    'rf_predictions': rf_predictions,
                    'xgb_predictions': xgb_predictions,
                    'closest_rows': closest_rows.to_dict(orient='records')
                }

                # Save the prediction
                saved_prediction = SavedPrediction.objects.create(
                    user=request.user,
                    input_data=input_serializer.validated_data,
                    rf_predictions=rf_predictions,
                    xgb_predictions=xgb_predictions
                )

                output_serializer = OutputSerializer(data=prediction)
                if output_serializer.is_valid():
                    logger.info(f"Prediction successful: {output_serializer.data}")
                    return Response(output_serializer.data, status=status.HTTP_200_OK)
                else:
                    logger.error(f"Output serialization failed: {output_serializer.errors}")
                    return Response({'error': 'Internal server error', 'details': output_serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                logger.exception(f"Prediction failed: {str(e)}")
                return Response({'error': 'Prediction failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            logger.error(f"Input validation failed: {input_serializer.errors}")
            return Response({'error': 'Bad request', 'details': input_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class SavedPredictionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        saved_predictions = SavedPrediction.objects.filter(user=request.user).order_by('-created_at')
        serializer = SavedPredictionSerializer(saved_predictions, many=True)
        return Response(serializer.data)