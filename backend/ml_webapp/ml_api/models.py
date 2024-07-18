# ml_api/models.py

from django.db import models
from django.contrib.auth.models import User

class SavedPrediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    input_data = models.JSONField()
    rf_predictions = models.JSONField()
    xgb_predictions = models.JSONField()
    closest_rows = models.JSONField(default=list)  # Add this line
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction for {self.user.username} at {self.created_at}"