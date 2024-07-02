# ml_api/ml_model.py

import joblib
import pandas as pd
import os

# Get the directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the model file
model_path = os.path.join(current_dir, 'trained_models', 'rf_models.joblib')

# Load the trained models
rf_models = joblib.load(model_path)

def predict(input_data):
    """
    Make predictions using the loaded Random Forest models.
    
    Args:
    input_data (dict): A dictionary containing the input features.
    
    Returns:
    dict: A dictionary containing predictions for each HO column.
    """
    # Prepare input data
    df = pd.DataFrame([input_data])
    
    # Combine Field_Controllers and VAV_Controllers for prediction
    df['Field_Controllers'] = df['Field_Controllers'] + df['VAV_Controllers']
    df = df.drop(columns=['VAV_Controllers'])
    
    # Make predictions
    predictions = {}
    for ho_col, model in rf_models.items():
        predictions[ho_col] = float(model.predict(df)[0])  # Convert numpy.float64 to Python float
    
    return predictions