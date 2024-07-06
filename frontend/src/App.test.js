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
  test('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('TMBA Sales Estimation Prediction')).toBeInTheDocument();
  });

  test('renders the prediction form', () => {
    render(<App />);
    expect(screen.getByText('Enter Prediction Data')).toBeInTheDocument();
  });

  test('opens and closes the menu', async () => {
    render(<App />);
    const user = userEvent.setup();
    const menuButton = screen.getByLabelText('menu');
    
    await user.click(menuButton);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();

    await user.click(menuButton); // Close the menu
    expect(screen.queryByText('About')).not.toBeInTheDocument();
  });

  test('adds and removes items from the prediction form', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Select an item
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('CO01'));
    await user.click(screen.getByText('Add Item'));

    // Check if the item chip is rendered
    expect(screen.getByText(/CO01:/)).toBeInTheDocument();

    // Remove the item
    const chip = screen.getByText(/CO01:/);
    const deleteButton = within(chip).getByRole('button');
    await user.click(deleteButton);

    // Check if the item chip is removed
    expect(screen.queryByText(/CO01:/)).not.toBeInTheDocument();
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
    const quantityInput = screen.getByLabelText(/quantity for co01/i);
    await user.type(quantityInput, '5');

    // Check if submit button is enabled
    const submitButton = screen.getByText('Make Prediction');
    expect(submitButton).toBeEnabled();
  });

  test('displays loading indicator when form is submitted', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Add an item and fill quantity
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('CO01'));
    await user.click(screen.getByText('Add Item'));
    const quantityInput = screen.getByLabelText(/quantity for co01/i);
    await user.type(quantityInput, '5');

    // Submit the form
    await user.click(screen.getByText('Make Prediction'));

    // Check if loading indicator is displayed
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

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

  test('allows multiple items to be added to the form', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Add first item
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('CO01'));
    await user.click(screen.getByText('Add Item'));

    // Add second item
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('AN04'));
    await user.click(screen.getByText('Add Item'));

    // Check if both items are rendered
    expect(screen.getByText(/CO01:/)).toBeInTheDocument();
    expect(screen.getByText(/AN04:/)).toBeInTheDocument();
  });

  test('updates chip text when quantity is entered', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Add an item
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('CO01'));
    await user.click(screen.getByText('Add Item'));

    // Initially, the chip should show "Not set"
    expect(screen.getByText('CO01: Not set')).toBeInTheDocument();

    // Fill quantity
    const quantityInput = screen.getByLabelText(/quantity for co01/i);
    await user.type(quantityInput, '5');

    // Check if chip text is updated
    expect(screen.getByText('CO01: 5')).toBeInTheDocument();
  });

  test('clears form after submission', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Add an item and fill quantity
    await user.click(screen.getByLabelText('Select Item'));
    await user.click(screen.getByText('CO01'));
    await user.click(screen.getByText('Add Item'));
    const quantityInput = screen.getByLabelText(/quantity for co01/i);
    await user.type(quantityInput, '5');

    // Submit the form
    await user.click(screen.getByText('Make Prediction'));

    // Check if form is cleared (item chip should be removed)
    expect(screen.queryByText(/CO01:/)).not.toBeInTheDocument();
  });
});