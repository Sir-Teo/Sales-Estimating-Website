from django.test import TestCase

# Create your tests here.
# ml_api/tests.py

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

class PredictionViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('predict')
        self.valid_payload = {
            'CO01': 2,
        }

    def test_valid_input(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('HO02', response.data)
        # Add more assertions here

    def test_invalid_input(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload['CO01'] = 'invalid'
        response = self.client.post(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
