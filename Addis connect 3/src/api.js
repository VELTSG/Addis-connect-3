import axios from 'axios'

const AI_BASE_URL = '/api/chatbot'
const AI_KEY = import.meta.env.VITE_AI_KEY

// Debug log
console.log('Environment check:', {
  VITE_AI_KEY: AI_KEY ? '***' : 'undefined',
})

if (!AI_KEY) {
  console.error('VITE_AI_KEY is not set in .env file')
}

const api = axios.create({
  baseURL: AI_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  // Attach AI provider key if present
  if (AI_KEY && !config.headers['x-goog-api-key']) {
    config.headers['x-goog-api-key'] = AI_KEY
  }
  return config
})

export default api
