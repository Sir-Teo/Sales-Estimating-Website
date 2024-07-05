import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';
import { makePrediction } from './api';

// Mock the api module
jest.mock('./api', () => ({
  makePrediction: jest.fn(),
}));

describe('App Component', () => {
  // ... [Previous tests remain unchanged]

  test('renders the company logo', () => {
    render(<App />);
    const logo = screen.getByAltText('Company Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'logo.png');
  });

  test('renders the footer with current year', () => {
    render(<App />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} TMBA. All rights reserved.`)).toBeInTheDocument();
  });

  test('adds and removes items from the prediction form', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Open the autocomplete dropdown
    await user.click(screen.getByLabelText('Select Item'));

    // Select an item (you might need to adjust this based on your actual options)
    await user.click(screen.getByText('CO01'));

    // Add the item
    await user.click(screen.getByText('Add Item'));

    // Check if the item chip is rendered
    expect(screen.getByText('CO01: Not set')).toBeInTheDocument();

    // Remove the item
    await user.click(screen.getByTestId('CancelIcon'));

    // Check if the item chip is removed
    expect(screen.queryByText('CO01: Not set')).not.toBeInTheDocument();
  });

  test('disables submit button when form is empty', () => {
    render(<App />);
    const submitButton = screen.getByText('Make Prediction');
    expect(submitButton).toBeDisabled();
  });

  test('enables submit button when form is filled', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Add an item
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('CO01'));
    await user.click(screen.getByText('Add Item'));

    // Fill quantity
    await user.type(screen.getByLabelText('Quantity for CO01'), '5');

    // Check if submit button is enabled
    const submitButton = screen.getByText('Make Prediction');
    expect(submitButton).toBeEnabled();
  });

  test('displays loading indicator when making prediction', async () => {
    makePrediction.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({}), 1000)));

    render(<App />);
    const user = userEvent.setup();

    // Add an item and fill quantity
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('CO01'));
    await user.click(screen.getByText('Add Item'));
    await user.type(screen.getByLabelText('Quantity for CO01'), '5');

    // Submit the form
    await user.click(screen.getByText('Make Prediction'));

    // Check if loading indicator is displayed
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for the loading to finish
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  test('renders ResultDisplay component with correct props', async () => {
    const mockResults = { item1: 100, item2: 200 };
    const mockInputs = { CO01: '5' };
    makePrediction.mockResolvedValue(mockResults);

    render(<App />);
    const user = userEvent.setup();

    // Add an item and fill quantity
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('CO01'));
    await user.click(screen.getByText('Add Item'));
    await user.type(screen.getByLabelText('Quantity for CO01'), '5');

    // Submit the form
    await user.click(screen.getByText('Make Prediction'));

    // Wait for results to be displayed
    await waitFor(() => {
      expect(screen.getByText('Prediction Results For Model 1')).toBeInTheDocument();
    });

    // Check if ResultDisplay renders correct data
    expect(screen.getByText('item1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('item2')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();

    // Check if input information is displayed
    expect(screen.getByText('CO01')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 5')).toBeInTheDocument();
  });

  test('handles pagination in ResultDisplay', async () => {
    const mockResults = Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`item${i + 1}`, (i + 1) * 100]));
    makePrediction.mockResolvedValue(mockResults);

    render(<App />);
    const user = userEvent.setup();

    // Add an item and fill quantity
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('CO01'));
    await user.click(screen.getByText('Add Item'));
    await user.type(screen.getByLabelText('Quantity for CO01'), '5');

    // Submit the form
    await user.click(screen.getByText('Make Prediction'));

    // Wait for results to be displayed
    await waitFor(() => {
      expect(screen.getByText('Prediction Results For Model 1')).toBeInTheDocument();
    });

    // Check initial page
    expect(screen.getByText('item1')).toBeInTheDocument();
    expect(screen.queryByText('item6')).not.toBeInTheDocument();

    // Go to next page
    await user.click(screen.getByLabelText('Go to next page'));

    // Check second page
    expect(screen.getByText('item6')).toBeInTheDocument();
    expect(screen.queryByText('item1')).not.toBeInTheDocument();
  });
});