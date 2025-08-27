// User profile and used services (mock implementation)
export async function fetchUserProfile() {
  // Simulate fetching user profile from backend
  return {
    email: localStorage.getItem('ac_email') || 'user@example.com',
    role: localStorage.getItem('ac_role') || 'user',
  };
}

export async function fetchUserServices() {
  // Simulate fetching services the user has used
  return [
    { id: 'ethioshield', name: 'EthioShield', link: '/ethioshield' },
    { id: 'chatbot', name: 'Smart AI', link: '/chatbot' },
  ];
}
import axios from 'axios'

// Axios instance for our Node backend
const backend = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT from localStorage if present
backend.interceptors.request.use((config) => {
  const token = localStorage.getItem('ac_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auth
export async function login(email, password) {
  const { data } = await backend.post('/auth/login', { email, password })
  const { token, user } = data
  if (token) localStorage.setItem('ac_token', token)
  if (user?.role) localStorage.setItem('ac_role', user.role)
  return data
}

export async function signup(email, password, username) {
  const { data } = await backend.post('/auth/signup', { email, password, username })
  return data
}

// Services (public)
export async function fetchServices() {
  const { data } = await backend.get('/services')
  return data
}
export async function fetchService(id) {
  const { data } = await backend.get(`/services/${id}`)
  return data
}

// Services (admin)
export async function createService(payload) {
  const { data } = await backend.post('/services', payload)
  return data
}
export async function updateService(id, payload) {
  const { data } = await backend.put(`/services/${id}`, payload)
  return data
}
export async function deleteService(id) {
  const { data } = await backend.delete(`/services/${id}`)
  return data
}

// Submissions (user)
export async function submitService(payload) {
  const { data } = await backend.post('/services/submit', payload)
  return data
}
export async function listMyServices() {
  const { data } = await backend.get('/services/mine')
  return data
}

// Moderation (admin)
export async function listPendingServices() {
  const { data } = await backend.get('/services/pending/list')
  return data
}
export async function approveService(id) {
  const { data } = await backend.post(`/services/${id}/approve`)
  return data
}
export async function rejectService(id) {
  const { data } = await backend.post(`/services/${id}/reject`)
  return data
}

export default backend
