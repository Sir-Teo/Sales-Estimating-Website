# ml_api/models.py

from django.db import models
from django.conf import settings

class SavedPrediction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=255)
    input_data = models.JSONField()
    rf_predictions = models.JSONField()
    xgb_predictions = models.JSONField()
    closest_rows = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.project_name} - {self.user.email}"