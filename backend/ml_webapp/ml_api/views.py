# ml_webapp/ml_api/views.py

import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .serializers import InputSerializer, OutputSerializer, SavedPredictionSerializer
from .ml_model import predict
from .models import SavedPrediction
from drf_yasg.utils import swagger_auto_schema

logger = logging.getLogger(__name__)

class PredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        input_serializer = InputSerializer(data=request.data)
        if input_serializer.is_valid():
            try:
                validated_data = input_serializer.validated_data
                project_name = validated_data.pop('project_name')
                email = validated_data.pop('email')
                inputs = validated_data.pop('inputs')
                prediction_results = predict(inputs)
                
                rf_predictions = prediction_results['Random Forest']
                xgb_predictions = prediction_results['XGBoost']
                rf_cost_predictions = prediction_results['Random Forest Cost']
                xgb_cost_predictions = prediction_results['XGBoost Cost']
                closest_rows = prediction_results['k-NN']

                prediction = {
                    'rf_predictions': rf_predictions,
                    'xgb_predictions': xgb_predictions,
                    'rf_cost_predictions': rf_cost_predictions,
                    'xgb_cost_predictions': xgb_cost_predictions,
                    'closest_rows': closest_rows.to_dict(orient='records')
                }

                saved_prediction = SavedPrediction.objects.create(
                    user=request.user,
                    project_name=project_name,
                    input_data=inputs,
                    rf_predictions=rf_predictions,
                    xgb_predictions=xgb_predictions,
                    rf_cost_predictions=rf_cost_predictions,
                    xgb_cost_predictions=xgb_cost_predictions,
                    closest_rows=closest_rows.to_dict(orient='records')
                )

                output_serializer = OutputSerializer(data=prediction)
                if output_serializer.is_valid():
                    return Response(output_serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Internal server error', 'details': output_serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                return Response({'error': 'Prediction failed', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Bad request', 'details': input_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    
class SavedPredictionsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class SavedPredictionsView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = SavedPredictionsPagination

    def get(self, request, format=None):
        saved_predictions = SavedPrediction.objects.filter(user=request.user).order_by('-created_at')
        
        paginator = self.pagination_class()
        paginated_predictions = paginator.paginate_queryset(saved_predictions, request)
        
        serializer = SavedPredictionSerializer(paginated_predictions, many=True)
        
        return paginator.get_paginated_response(serializer.data)

class DeletePredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, format=None):
        try:
            prediction = SavedPrediction.objects.get(pk=pk, user=request.user)
            prediction.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except SavedPrediction.DoesNotExist:
            return Response({'error': 'Prediction not found'}, status=status.HTTP_404_NOT_FOUND)
