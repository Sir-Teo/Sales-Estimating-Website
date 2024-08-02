import { useState, useEffect } from 'react';
import { makePrediction, getSavedPredictions, deletePrediction } from '../api';

export function usePredictions(isLoggedIn) {
  const [results, setResults] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedPredictions, setSavedPredictions] = useState([]);
  const [showSavedPredictions, setShowSavedPredictions] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchSavedPredictions();
    }
  }, [isLoggedIn]);

  const fetchSavedPredictions = async () => {
    try {
      const predictions = await getSavedPredictions();
      setSavedPredictions(predictions);
    } catch (err) {
      console.error('Error fetching saved predictions', err);
      setError('Failed to fetch saved predictions');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      setResults(null);
      setInputs(formData);
      const data = await makePrediction(formData);
      setResults(data);
      fetchSavedPredictions();
    } catch (err) {
      setError('An error occurred while making the prediction. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavedPredictionClick = (prediction) => {
    // Format the inputs to match the structure expected by InputInformation
    const formattedInputs = {
      project_name: prediction.project_name,
      userEmail: prediction.email,
      inputs: prediction.filtered_input_data
    };
    setInputs(formattedInputs);
    
    setResults({
      rf_predictions: prediction.rf_predictions,
      xgb_predictions: prediction.xgb_predictions,
      rf_cost_predictions: prediction.rf_cost_predictions,
      xgb_cost_predictions: prediction.xgb_cost_predictions,
      closest_rows: prediction.closest_rows,
    });
    setShowSavedPredictions(false);
  };

  const handleDeletePrediction = async (id) => {
    try {
      await deletePrediction(id);
      fetchSavedPredictions();
    } catch (err) {
      console.error('Error deleting prediction', err);
      setError('Failed to delete prediction');
    }
  };

  return {
    results,
    inputs,
    error,
    isLoading,
    savedPredictions,
    showSavedPredictions,
    setShowSavedPredictions,
    handleSubmit,
    handleSavedPredictionClick,
    handleDeletePrediction
  };
}