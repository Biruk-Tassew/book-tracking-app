import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/books'; // Update with your backend API endpoint

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Set the Content-Type header to application/json
  },
});

export default api;
