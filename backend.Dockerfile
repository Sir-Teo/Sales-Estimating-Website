# Backend Dockerfile
FROM python:3.9
WORKDIR /app
COPY backend/ml_webapp/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ml_webapp/ .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]