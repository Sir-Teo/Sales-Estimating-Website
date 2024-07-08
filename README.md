# Sales Estimating Website

## Description
The Sales Estimating Website is a platform designed to estimate the actual hours of work needed to complete a project based on user inputs. The project leverages a frontend built with React and a backend powered by Django with a postgreSQL database.

## Features
- User-friendly interface for inputting project details
- Real-time estimation of work hours
- Integration of machine learning models for accurate predictions
- Beautiful and responsive design
- Dockerized setup for easy deployment

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- Node.js and npm
- Python
- Docker

### Frontend
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```
The React app will be available at `http://localhost:3000/`.

### Backend
1. Navigate to the backend directory:
    ```bash
    cd backend/ml_webapp/
    ```
2. Run the Django development server:
    ```bash
    python manage.py runserver
    ```
The backend server will be available at `http://localhost:8000/`.

### Docker
To run the entire application using Docker:
1. Build and start the containers:
    ```bash
    docker-compose up --build
    ```

## Usage

1. Open the website in your browser.
2. Input the project details in the provided form.
3. Submit the form to get an estimated number of work hours.
