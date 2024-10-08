from rest_framework import serializers
from .models import SavedPrediction

# Define the groups_manual for reference
groups_manual = {
    'Master_Controllers': ['CO01', 'CO06', 'AN09', 'SX01', 'TD01', 'DC01', 'DC02', 'DC09'],
    'Field_Controllers': ['SX05', 'SX06'],
    'VAV_Controllers': ['AN04', 'AN05', 'AN06', 'DC03', 'DC04', 'DC05', 'SX04'],
    'Sensors': ['DA01', 'DA02', 'DA03', 'DM01', 'DT01', 'DT02', 'DT03', 'DT04', 'DT05', 'DT06', 'DT07', 'DT08', 'DT09', 'HS01', 'HS02', 'HS03', 'HS04', 'MD01', 'MD02', 'SE01', 'SE02', 'SE03', 'SE04', 'SE05', 'SE06', 'SE07', 'SE08', 'SE09', 'SE10', 'SE11', 'SE12', 'SS01', 'SS02', 'ST01', 'ST02', 'ST03', 'ST04', 'DC06', 'DC07', 'SW01', 'SW02', 'SW03', 'SW04', 'SW05', 'SW06', 'TC01', 'TC02', 'TC03', 'TC04', 'TC05', 'TR01', 'TR02', 'TR03', 'TS01', 'TS02', 'TS03', 'TS04', 'TS05', 'VL01', 'VL02'],
    'Panels': ['EN01'],
    'Software': ['CO07', 'CP02', 'DC08', 'CP06', 'SX02', 'TD02'],
    'Computers': ['CP01', 'CP05'],
}

# Flatten the dictionary into a list of codes
all_codes = [code for group in groups_manual.values() for code in group]

class InputSerializer(serializers.Serializer):
    project_name = serializers.CharField(max_length=255, required=True)
    email = serializers.EmailField(required=True)  # Add user_email field
    inputs = serializers.DictField(child=serializers.IntegerField(min_value=0, required=False, default=0))

# Define the output fields
class PredictionSerializer(serializers.Serializer):
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

# Define the possible string fields, here we assume all_codes includes only numerical fields,
# so adding additional potential string fields manually.
string_fields = ['JobNumber', 'JobDescription']  # Example string fields, replace with actual ones

class ClosestRowSerializer(serializers.Serializer):
    # Dynamically add all possible fields
    def __init__(self, *args, **kwargs):
        super(ClosestRowSerializer, self).__init__(*args, **kwargs)
        for field in string_fields:
            self.fields[field] = serializers.CharField(required=False)
        for code in all_codes:
            self.fields[code] = serializers.FloatField(required=False)
        # Add HO fields
        for i in range(2, 13):
            self.fields[f'HO{i:02d}'] = serializers.FloatField(required=False)

class CostPredictionSerializer(serializers.Serializer):
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

class OutputSerializer(serializers.Serializer):
    rf_predictions = PredictionSerializer()
    xgb_predictions = PredictionSerializer()
    rf_cost_predictions = CostPredictionSerializer()
    xgb_cost_predictions = CostPredictionSerializer()
    closest_rows = ClosestRowSerializer(many=True)

class SavedPredictionSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    filtered_input_data = serializers.SerializerMethodField()

    class Meta:
        model = SavedPrediction
        fields = ['id', 'email', 'project_name', 'filtered_input_data', 'rf_predictions', 'xgb_predictions', 'rf_cost_predictions', 'xgb_cost_predictions', 'closest_rows', 'created_at']
        read_only_fields = ['id', 'email', 'created_at']

    def get_filtered_input_data(self, obj):
        if isinstance(obj.input_data, dict):
            return {k: v for k, v in obj.input_data.items() if v != 0}
        return obj.input_data