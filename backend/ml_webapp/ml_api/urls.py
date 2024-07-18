# ml_app/ml_api/urls.py

from django.urls import path
from .views import PredictionView, SavedPredictionsView, DeletePredictionView

urlpatterns = [
    path('predict/', PredictionView.as_view(), name='predict'),
    path('saved-predictions/', SavedPredictionsView.as_view(), name='saved-predictions'),
    path('saved-predictions/<int:pk>/', DeletePredictionView.as_view(), name='delete-prediction'),
]