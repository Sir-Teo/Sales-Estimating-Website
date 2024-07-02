# ml_api/urls.py

from django.urls import path
from .views import PredictionView

urlpatterns = [
    path('predict/', PredictionView.as_view(), name='predict'),
]