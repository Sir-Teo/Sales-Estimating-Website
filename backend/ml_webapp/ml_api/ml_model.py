# ml_api/ml_model.py

import joblib
import pandas as pd
import os

# Get the directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the model file
model_path = os.path.join(current_dir, '..', 'rf_models.joblib')

# Load the trained models
rf_models = joblib.load(model_path)

# Define groups_manual again for reference
groups_manual = {
    'Master_Controllers': ['CO01', 'CO06', 'AN09', 'SX01', 'TD01', 'DC01', 'DC02', 'DC09'],
    'Field_Controllers': ['SX05', 'SX06'],
    'VAV_Controllers': ['AN04', 'AN05', 'AN06', 'DC03', 'DC04', 'DC05', 'SX04'],
    'Sensors': ['DA01', 'DA02', 'DA03', 'DM01', 'DT01', 'DT02', 'DT03', 'DT04', 'DT05', 'DT06', 'DT07', 'DT08', 'DT09', 'HS01', 'HS02', 'HS03', 'HS04', 'MD01', 'MD02', 'SE01', 'SE02', 'SE03', 'SE04', 'SE05', 'SE06', 'SE07', 'SE08', 'SE09', 'SE10', 'SE11', 'SE12', 'SS01', 'SS02', 'ST01', 'ST02', 'ST03', 'ST04', 'DC06', 'DC07', 'SW01', 'SW02', 'SW03', 'SW04', 'SW05', 'SW06', 'TC01', 'TC02', 'TC03', 'TC04', 'TC05', 'TR01', 'TR02', 'TR03', 'TS01', 'TS02', 'TS03', 'TS04', 'TS05', 'VL01', 'VL02'],
    'Panels': ['EN01'],
    'Software': ['CO07', 'CP02', 'DC08', 'CP06', 'SX02', 'TD02'],
    'Computers': ['CP01', 'CP05'],
}

# Flatten the dictionary into a list of all possible codes
all_codes = [code for group in groups_manual.values() for code in group]

def predict(input_data):
    """
    Make predictions using the loaded Random Forest models.
    
    Args:
    input_data (dict): A dictionary containing the input features.
    
    Returns:
    dict: A dictionary containing predictions for each HO column.
    """
    # Fill missing codes with 0
    for code in all_codes:
        if code not in input_data:
            input_data[code] = 0

    # Prepare input data
    df = pd.DataFrame([input_data])
    
    # Combine codes into groups as required by the model
    df['Master_Controllers'] = df[['CO01', 'CO06', 'AN09', 'SX01', 'TD01', 'DC01', 'DC02', 'DC09']].sum(axis=1)
    df['Field_Controllers'] = df[['SX05', 'SX06']].sum(axis=1)
    df['VAV_Controllers'] = df[['AN04', 'AN05', 'AN06', 'DC03', 'DC04', 'DC05', 'SX04']].sum(axis=1)
    df['Sensors'] = df[['DA01', 'DA02', 'DA03', 'DM01', 'DT01', 'DT02', 'DT03', 'DT04', 'DT05', 'DT06', 'DT07', 'DT08', 'DT09', 'HS01', 'HS02', 'HS03', 'HS04', 'MD01', 'MD02', 'SE01', 'SE02', 'SE03', 'SE04', 'SE05', 'SE06', 'SE07', 'SE08', 'SE09', 'SE10', 'SE11', 'SE12', 'SS01', 'SS02', 'ST01', 'ST02', 'ST03', 'ST04', 'DC06', 'DC07', 'SW01', 'SW02', 'SW03', 'SW04', 'SW05', 'SW06', 'TC01', 'TC02', 'TC03', 'TC04', 'TC05', 'TR01', 'TR02', 'TR03', 'TS01', 'TS02', 'TS03', 'TS04', 'TS05', 'VL01', 'VL02']].sum(axis=1)
    df['Panels'] = df[['EN01']].sum(axis=1)
    df['Software'] = df[['CO07', 'CP02', 'DC08', 'CP06', 'SX02', 'TD02']].sum(axis=1)
    df['Computers'] = df[['CP01', 'CP05']].sum(axis=1)
    
    # Drop individual codes
    df = df.drop(columns=[code for group in groups_manual.values() for code in group])
    
    # Make predictions
    predictions = {}
    for ho_col, model in rf_models.items():
        predictions[ho_col] = float(model.predict(df[['Master_Controllers', 'Field_Controllers', 'Sensors', 'Panels', 'Software', 'Computers']])[0])
    
    return predictions
