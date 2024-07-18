# ml_app/ml_api/urls.py

from django.urls import path
from .views import PredictionView, SavedPredictionsView

urlpatterns = [
    path('predict/', PredictionView.as_view(), name='predict'),
    path('saved-predictions/', SavedPredictionsView.as_view(), name='saved-predictions')
]