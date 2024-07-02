# ml_api/views.py

import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import InputSerializer, OutputSerializer
from .ml_model import predict

logger = logging.getLogger(__name__)

class PredictionView(APIView):
    def post(self, request, format=None):
        logger.info(f"Received prediction request: {request.data}")
        
        input_serializer = InputSerializer(data=request.data)
        if input_serializer.is_valid():
            try:
                prediction = predict(input_serializer.validated_data)
                
                output_serializer = OutputSerializer(data=prediction)
                if output_serializer.is_valid():
                    logger.info(f"Prediction successful: {output_serializer.data}")
                    return Response(output_serializer.data, status=status.HTTP_200_OK)
                else:
                    logger.error(f"Output serialization failed: {output_serializer.errors}")
                    return Response(output_serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                logger.exception(f"Prediction failed: {str(e)}")
                return Response({'error': 'Prediction failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            logger.error(f"Input validation failed: {input_serializer.errors}")
            return Response(input_serializer.errors, status=status.HTTP_400_BAD_REQUEST)