# ml_api/models.py

from django.db import models
from authentication.models import CustomUser

class SavedPrediction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=100,default='Unknown Project')
    input_data = models.JSONField()
    rf_predictions = models.JSONField()
    xgb_predictions = models.JSONField()
    closest_rows = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction for {self.user.email} at {self.created_at}"