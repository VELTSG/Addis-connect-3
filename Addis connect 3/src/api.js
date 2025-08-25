import axios from 'axios'

// Use the Vite proxy endpoint
const api = axios.create({
  baseURL: '/api/chatbot', // <-- proxy to Gemini API via Vite
  headers: { 'Content-Type': 'application/json' },
})

// Optional: intercept requests for admin auth or debug logging
api.interceptors.request.use((config) => {
  // Attach app auth token (for protected admin APIs)
  const token = localStorage.getItem('ac_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // For Gemini requests via proxy, the key is included in the query string
  // so we do NOT need to send x-api-key header from the frontend

  return config
})

// Optional: log all requests (for debugging)
api.interceptors.request.use((config) => {
  console.log('Sending request to:', config.baseURL + config.url)
  return config
})

export default api



