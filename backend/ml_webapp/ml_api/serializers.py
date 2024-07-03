from rest_framework import serializers

# Define the input fields in a dictionary
input_fields = {
    'Master_Controllers': serializers.IntegerField(min_value=0),
    'Field_Controllers': serializers.IntegerField(min_value=0),
    'VAV_Controllers': serializers.IntegerField(min_value=0),
    'Sensors': serializers.IntegerField(min_value=0),
    'Panels': serializers.IntegerField(min_value=0),
    'Software': serializers.IntegerField(min_value=0),
    'Computers': serializers.FloatField(min_value=0),
    # Add more fields as needed
}

# Dynamically create the InputSerializer class
class InputSerializer(serializers.Serializer):
    pass

for field_name, field_instance in input_fields.items():
    InputSerializer._declared_fields[field_name] = field_instance

# Define the output fields similarly if needed
output_fields = {
    'HO02': serializers.FloatField(),
    'HO03': serializers.FloatField(),
    'HO04': serializers.FloatField(),
    'HO05': serializers.FloatField(),
    'HO06': serializers.FloatField(),
    'HO07': serializers.FloatField(),
    'HO08': serializers.FloatField(),
    'HO09': serializers.FloatField(),
    'HO10': serializers.FloatField(),
    'HO11': serializers.FloatField(),
    'HO12': serializers.FloatField(),
    # Add more fields as needed
}

# Dynamically create the OutputSerializer class
class OutputSerializer(serializers.Serializer):
    pass

for field_name, field_instance in output_fields.items():
    OutputSerializer._declared_fields[field_name] = field_instance
