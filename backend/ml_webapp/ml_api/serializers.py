# ml_api/serializers.py

from rest_framework import serializers

class InputSerializer(serializers.Serializer):
    """
    Serializer for input data.
    """
    Master_Controllers = serializers.IntegerField(min_value=0)
    Field_Controllers = serializers.IntegerField(min_value=0)
    VAV_Controllers = serializers.IntegerField(min_value=0)
    Sensors = serializers.IntegerField(min_value=0)
    Panels = serializers.IntegerField(min_value=0)
    Software = serializers.IntegerField(min_value=0)
    Computers = serializers.FloatField(min_value=0)

class OutputSerializer(serializers.Serializer):
    """
    Serializer for output data.
    """
    HO02 = serializers.FloatField()
    HO03 = serializers.FloatField()
    HO04 = serializers.FloatField()
    HO05 = serializers.FloatField()
    HO06 = serializers.FloatField()
    HO07 = serializers.FloatField()
    HO08 = serializers.FloatField()
    HO09 = serializers.FloatField()
    HO10 = serializers.FloatField()
    HO11 = serializers.FloatField()
    HO12 = serializers.FloatField()