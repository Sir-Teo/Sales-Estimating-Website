import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Container, Paper, Typography } from '@mui/material';
import 'katex/dist/katex.min.css';

const markdownContent = `
# How to Use and Interpret the Sales Prediction Models

## 1. Introduction

This report provides comprehensive guidance on how to correctly use the machine learning models for sales prediction and how to interpret their results. The system employs multiple models, including Random Forest and XGBoost, for both hour and cost predictions, as well as a k-Nearest Neighbors (k-NN) model for finding similar projects. This report aims to equip users with the knowledge to effectively utilize these models and understand their outputs and limitations.

## 2. Model Overview

The prediction system consists of the following components:

1. Random Forest model for hour predictions
2. XGBoost model for hour predictions
3. Random Forest model for cost predictions
4. XGBoost model for cost predictions
5. k-Nearest Neighbors (k-NN) model for finding similar projects

## 3. Input Data

The models accept input data in the form of a cost items and was groups into the following categories:

- Master Controllers
- Field Controllers
- Sensors
- Panels
- Software
- Computers

Each feature represents a count or quantity of the respective component in the project.

## 4. Making Predictions

To make a prediction:

1. Prepare your input data as a dictionary with the above features.
2. Submit the data to the prediction function.
3. The function will return predictions from all models, including hour predictions, cost predictions, and similar projects.

## 5. Interpreting Results

### 5.1 Hour Predictions

Both Random Forest and XGBoost models provide hour predictions for different categories (HO02 to HO12). These represent estimated hours for various stages or aspects of the project.

Example predictions:

| Model | HO02 | HO03 | HO04 | HO05 | HO06 | HO07 | HO08 | HO09 | HO10 | HO11 | HO12 |
|-------|------|------|------|------|------|------|------|------|------|------|------|
| **Random Forest** | 80.41 | 31.67 | 214.93 | 233.33 | 0.19 | 3.90 | 0.0 | 127.02 | 177.41 | 13.32 | 48.76 |
| **XGBoost** | 110.30 | 45.68 | 205.24 | 280.74 | -0.61 | 7.20 | 0.0 | 130.01 | 184.29 | 53.30 | 69.30 |

- Compare the predictions from both models to get a range of estimates.
- Pay attention to significant differences between the two models, as these may indicate areas of uncertainty.
- Note that negative predictions (e.g., HO06 in XGBoost) are not meaningful and should be interpreted as very low or zero values.

### 5.2 Cost Predictions

Similar to hour predictions, both Random Forest and XGBoost models provide cost predictions for the same categories (HO02 to HO12).

Example predictions:

| Model | HO02 | HO03 | HO04 | HO05 | HO06 | HO07 | HO08 | HO09 | HO10 | HO11 | HO12 |
|-------|------|------|------|------|------|------|------|------|------|------|------|
| **Random Forest** | 866.97 | 393.39 | 2365.69 | 3708.81 | 0.0 | 129.62 | 0.0 | 2168.67 | 1596.79 | 5.01 | 281.49 |
| **XGBoost** | -197.45 | -122.02 | 773.12 | 3976.92 | -1.60 | -38.10 | 0.04 | 1727.50 | 238.67 | 11.48 | 307.63 |

- These represent estimated costs for various stages or aspects of the project.
- Again, compare predictions from both models to get a range of estimates.
- Be cautious of negative predictions, as these are likely inaccurate and indicate model limitations for certain scenarios. Treat negative predictions as very low or near-zero costs.

### 5.3 k-Nearest Neighbors (k-NN) Results

The k-NN model provides information about similar projects in the database:

| Indices | Distances |
|---------|-----------|
| [800, 4, 1030, 460, 732, 667, 928, 221, 420, 781] | [0.0416, 0.0418, 0.0448, 0.0555, 0.0602, 0.0607, 0.0608, 0.0609, 0.0613, 0.0625] |

- Lower distance values indicate higher similarity.
- Use these similar projects as reference points for sanity-checking your predictions and understanding potential variations.

## 6. Technical Details of Models

### 6.1 Random Forest

Random Forest is an ensemble learning method that operates by constructing multiple decision trees during training and outputting the mean prediction of the individual trees for regression tasks.

Key characteristics:

- Builds multiple decision trees and merges them to get a more accurate and stable prediction
- Reduces overfitting by averaging multiple deep decision trees
- Handles non-linear relationships well
- Can capture complex interactions between features

### 6.2 XGBoost (eXtreme Gradient Boosting)

XGBoost is an optimized distributed gradient boosting library designed to be highly efficient, flexible, and portable.

Key characteristics:

- Uses gradient boosting framework
- Builds trees sequentially, with each new tree correcting errors made by the previously trained tree
- Employs regularization to prevent overfitting
- Highly efficient in handling sparse data

### 6.3 k-Nearest Neighbors (k-NN)

k-NN is a non-parametric method used for classification and regression. In this context, it's used to find similar projects.

Key characteristics:

- Stores all available cases and classifies new cases based on a similarity measure
- Does not build a general internal model, but stores instances of training data
- Simple to implement but can be computationally expensive, especially as the size of the dataset grows

## 7. Model Performance Metrics

### 7.1 Mean Absolute Error (MAE)

MAE measures the average magnitude of the errors in a set of predictions, without considering their direction.


$$
MAE = \\frac{1}{n} \\sum_{i=1}^{n} |y_i - x_i|
$$


Where:

- $n$ is the number of errors
- $y_i$ is the prediction
- $x_i$ is the true value

Interpretation:

- MAE is in the same units as the original data
- Lower values indicate better model performance
- MAE = 0 indicates perfect prediction

### 7.2 R-squared (R²)

R² provides a measure of how well observed outcomes are replicated by the model, based on the proportion of total variation of outcomes explained by the model.

$$
R^2 = 1 - \\frac{SS_{res}}{SS_{tot}}
$$

Where:

- $SS_{res}$ is the sum of squared residuals
- $SS_{tot}$ is the total sum of squares

Interpretation:

- R² ranges from -∞ to 1
- R² = 1 indicates that the model perfectly fits the data
- R² = 0 indicates that the model is as good as one that always predicts the mean of the data
- Negative R² occurs when the model is performing worse than a horizontal line

Example interpretation:
For Random Forest (Hours), HO04 has an R² of 0.604. This means that approximately 60.4% of the variance in HO04 hours can be explained by the model.

### 7.3 Performance Analysis

Let's analyze the performance metrics for the Random Forest (Hours) model:

| Category | MAE | R² |
|----------|-----|-----|
| HO02 | 20.56 | 0.374 |
| HO03 | 8.97 | 0.121 |
| HO04 | 25.98 | 0.604 |
| HO05 | 40.94 | 0.591 |
| HO06 | 3.02 | -127.902 |
| HO07 | 2.83 | -0.131 |
| HO08 | 0.08 | -0.516 |
| HO09 | 49.91 | 0.012 |
| HO10 | 103.76 | -5.336 |
| HO11 | 2.28 | -1.677 |
| HO12 | 5.49 | -0.140 |

Observations:

1. HO04 and HO05 show the best performance, with R² values above 0.5, indicating that the model explains more than 50% of the variance in these categories.
2. HO02 shows moderate performance with an R² of 0.374.
3. Most other categories, especially HO06-HO12, show poor performance with negative R² values, indicating that the model performs worse than a simple mean prediction for these categories.
4. MAE values vary widely across categories, which is expected given the different scales of hours for each category. For example, an MAE of 40.94 for HO05 might be more acceptable if the typical values for HO05 are in the hundreds of hours.

These metrics highlight the importance of using the model predictions judiciously, especially for categories with poor performance metrics.

## 8. Limitations and Considerations

1. The models show varying performance across different categories. Some categories (e.g., HO04, HO05) show relatively good performance, while others (e.g., HO06, HO10) show poor performance.

2. Negative R² values for many categories indicate that the models are struggling to capture the underlying patterns effectively. This suggests that predictions for these categories should be treated with caution.

3. The cost prediction models generally show poorer performance than the hour prediction models. Be particularly cautious when interpreting cost predictions, especially those with negative values.

4. When encountering negative predictions (especially in cost models), treat these as unreliable and consider them as very low or near-zero predictions.

5. The k-NN model can be valuable for finding similar projects, but always consider the context and specific details of these projects when making comparisons.

6. Pay attention to the MAE values when interpreting predictions. For example, if a prediction for HO04 is 214 hours and the MAE is 26 hours, the actual value could reasonably be expected to fall within the range of 188 to 240 hours.

7. The varying performance across different hour categories (HO02-HO12) suggests that some aspects of the project are more predictable than others. This could be due to inherent variability in certain tasks, data quality issues, or the need for additional relevant features for those categories.

8. The extremely negative R² values for some categories (e.g., HO06 with R² = -127.902) indicate that the model is performing exceptionally poorly for these categories. This could be due to outliers, lack of relevant features, or inherent unpredictability in these categories.

## 9. Conclusion

While these models provide valuable insights for project estimation, they should be used as part of a broader decision-making process. Always combine model predictions with domain expertise, historical data, and project-specific considerations. Regularly monitor and update the models as new data becomes available to improve their accuracy and reliability over time.

When using these predictions:

1. Consider both Random Forest and XGBoost predictions to get a range of estimates.
2. Pay more attention to categories with better performance metrics (higher R², lower MAE).
3. Use the k-NN results to compare your project with similar past projects for context.
4. Be especially cautious with cost predictions, as they show poorer performance overall.
5. Remember that these are estimates and should be used as guidelines rather than definitive values.
6. For categories with very poor performance metrics (e.g., highly negative R² values), consider using simpler estimation methods or expert judgment instead of relying on the model predictions.
7. The technical understanding of the models and metrics should inform the level of confidence placed in different aspects of the predictions. Use this knowledge to focus on the more reliable parts of the model output and to guide efforts in improving the models or data collection for less reliable aspects.

By following these guidelines and understanding the technical aspects of the models, you can make more informed decisions and better leverage the insights provided by the prediction system.

## 10. Performance Metrics Summary

### Hours Prediction Metrics

| Model | HO02 | HO03 | HO04 | HO05 | HO06 | HO07 | HO08 | HO09 | HO10 | HO11 | HO12 |
|-------|------|------|------|------|------|------|------|------|------|------|------|
| **Random Forest** | MAE: 20.56, R²: 0.374 | MAE: 8.97, R²: 0.121 | MAE: 25.98, R²: 0.604 | MAE: 40.94, R²: 0.591 | MAE: 3.02, R²: -127.902 | MAE: 2.83, R²: -0.131 | MAE: 0.08, R²: -0.516 | MAE: 49.91, R²: 0.012 | MAE: 103.76, R²: -5.336 | MAE: 2.28, R²: -1.677 | MAE: 5.49, R²: -0.140 |
| **XGBoost** | MAE: 21.55, R²: 0.209 | MAE: 10.13, R²: -0.241 | MAE: 36.18, R²: 0.136 | MAE: 44.53, R²: 0.426 | MAE: 6.06, R²: -840.182 | MAE: 3.02, R²: -0.942 | MAE: 0.04, R²: -0.004 | MAE: 54.30, R²: -0.283 | MAE: 118.44, R²: -11.867 | MAE: 3.17, R²: -6.527 | MAE: 5.97, R²: -0.469 |

### Cost Prediction Metrics

| Model | HO02 | HO03 | HO04 | HO05 | HO06 | HO07 | HO08 | HO09 | HO10 | HO11 | HO12 |
|-------|------|------|------|------|------|------|------|------|------|------|------|
| **Random Forest** | MAE: 2445.07, R²: 0.0005 | MAE: 972.28, R²: -0.116 | MAE: 5962.78, R²: -0.079 | MAE: 7839.41, R²: -0.066 | MAE: 83.48, R²: -3.158 | MAE: 337.14, R²: -0.099 | MAE: 3.97, R²: 0.0 | MAE: 4662.65, R²: -0.794 | MAE: 4440.58, R²: -2.170 | MAE: 159.96, R²: -0.738 | MAE: 1366.25, R²: -0.011 |
| **XGBoost** | MAE: 2587.88, R²: -0.081 | MAE: 999.34, R²: -0.220 | MAE: 6423.48, R²: -0.134 | MAE: 8147.13, R²: -0.106 | MAE: 45.55, R²: -0.129 | MAE: 373.89, R²: -0.387 | MAE: 1.90, R²: 0.0 | MAE: 4877.62, R²: -1.275 | MAE: 4378.75, R²: -1.648 | MAE: 174.53, R²: -3.054 | MAE: 1354.57, R²: -0.010 |

## 11. Example Predictions

**Random Forest (Hours):**

- HO02: 80.4134
- HO03: 31.67
- HO04: 214.9341
- HO05: 233.3325
- HO06: 0.19
- HO07: 3.895
- HO08: 0.0
- HO09: 127.02
- HO10: 177.405
- HO11: 13.32
- HO12: 48.76

**XGBoost (Hours):**

- HO02: 110.30191
- HO03: 45.683083
- HO04: 205.2411
- HO05: 280.74255
- HO06: -0.6063696
- HO07: 7.1963286
- HO08: 0.00015274987
- HO09: 130.00801
- HO10: 184.29366
- HO11: 53.29639
- HO12: 69.30201

**Random Forest (Cost):**

- HO02: 866.9744
- HO03: 393.3902
- HO04: 2365.6883
- HO05: 3708.8107
- HO06: 0.0
- HO07: 129.6215
- HO08: 0.0
- HO09: 2168.6657
- HO10: 1596.7897
- HO11: 5.0129
- HO12: 281.4883

**XGBoost (Cost):**

- HO02: -197.45369
- HO03: -122.01524
- HO04: 773.12085
- HO05: 3976.919
- HO06: -1.5950521
- HO07: -38.104492
- HO08: 0.04414573
- HO09: 1727.49617
- HO10: 238.66733
- HO11: 11.478161
- HO12: 307.63193

**k-NN Results:**

- Indices: [800, 4, 1030, 460, 732, 667, 928, 221, 420, 781]
- Distances: [0.0416, 0.0418, 0.0448, 0.0555, 0.0602, 0.0607, 0.0608, 0.0609, 0.0613, 0.0625]

By incorporating these metrics and understanding their implications, you can more effectively use the sales prediction models to inform project estimation and planning.
`;

function MarkdownReport() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4, backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Models Report
        </Typography>
        <ReactMarkdown
          children={markdownContent}
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            table: ({ node, ...props }) => (
              <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }} {...props} />
              </div>
            ),
            th: ({ node, ...props }) => (
              <th
                style={{
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ddd',
                  padding: '8px',
                  textAlign: 'left',
                }}
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                }}
                {...props}s
              />
            ),
          }}
        />
      </Paper>
    </Container>
  );
}

export default MarkdownReport;