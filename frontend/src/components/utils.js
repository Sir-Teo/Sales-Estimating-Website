export const prepareChartData = (rf_predictions, xgb_predictions) => {
  return Object.keys(rf_predictions).map(key => ({
    name: key,
    RF: parseFloat(rf_predictions[key].toFixed(2)),
    XGB: parseFloat(xgb_predictions[key].toFixed(2))
  }));
};