import joblib
import pandas as pd
import os

# Get the directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the model file
rf_model_path = os.path.join(current_dir, '..', 'rf_models.joblib')
xgb_model_path = os.path.join(current_dir, '..', 'xgb_models.joblib')
knn_model_path = os.path.join(current_dir, '..', 'knn_model.joblib')
knn_scalar_path = os.path.join(current_dir, '..', 'knn_scaler.joblib')

# Load the trained models
rf_models = joblib.load(rf_model_path)
xgb_models = joblib.load(xgb_model_path)
knn_model = joblib.load(knn_model_path)
knn_scaler = joblib.load(knn_scalar_path)

# Load the original data
pivot_grouped_df = pd.read_csv(os.path.join(current_dir, '..', 'pivot_grouped.csv'))

input_features = ['Master_Controllers', 'Field_Controllers', 'Sensors', 'Panels', 'Software', 'Computers']
output_columns = pivot_grouped_df.columns.tolist()

y = pivot_grouped_df[output_columns]

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

def predict_ten_closest_rows(input_data):
    # Normalize the input data
    input_data_scaled = knn_scaler.transform(input_data)
    # Find the ten closest rows
    distances, indices = knn_model.kneighbors(input_data_scaled)
    # Get the closest rows from the original dataset
    # Ensure indices are within bounds
    valid_indices = [idx for idx in indices[0] if idx < len(y)]
    closest_rows = y.iloc[valid_indices]
    return closest_rows

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
    df['Master_Controllers'] = df[groups_manual['Master_Controllers']].sum(axis=1)
    df['Field_Controllers'] = df[groups_manual['Field_Controllers']].sum(axis=1)
    df['VAV_Controllers'] = df[groups_manual['VAV_Controllers']].sum(axis=1)
    df['Sensors'] = df[groups_manual['Sensors']].sum(axis=1)
    df['Panels'] = df[groups_manual['Panels']].sum(axis=1)
    df['Software'] = df[groups_manual['Software']].sum(axis=1)
    df['Computers'] = df[groups_manual['Computers']].sum(axis=1)
    
    # Drop individual codes
    df = df.drop(columns=all_codes)

    # Make predictions
    rf_predictions = {}
    for ho_col, model in rf_models.items():
        rf_predictions[ho_col] = float(model.predict(df[input_features])[0])
    
    xgb_predictions = {}
    for ho_col, model in xgb_models.items():
        xgb_predictions[ho_col] = float(model.predict(df[input_features])[0])

    top_10_closest_rows = predict_ten_closest_rows(df[input_features])

    return rf_predictions, xgb_predictions, top_10_closest_rows

# Test the function with an example input
if __name__ == '__main__':
    fake_data = {
        'CO01': 213,
        'CO06': 0,
    }
    print(predict(fake_data))
