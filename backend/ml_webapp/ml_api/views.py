import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import InputSerializer, OutputSerializer
from .ml_model import predict
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny


logger = logging.getLogger(__name__)



class PredictionView(APIView):
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
                    'closest_rows': closest_rows.to_dict(orient='records')  # Convert dataframe to list of dicts
                }

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
        

        # Add this to ml_api/views.py or create a new file auth/views.py

class RegisterView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, 
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING),
                'email': openapi.Schema(type=openapi.TYPE_STRING),
                'password': openapi.Schema(type=openapi.TYPE_STRING),
            }
        ),
        responses={201: 'Created', 400: 'Bad Request'}
    )
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not email or not password:
            return Response({'error': 'Please provide username, email, and password'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)