import axios from 'axios'
import { store } from './../../store'

const API_URL = 'http://localhost:3000'

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS') {
    config.headers = {
      ...config.headers,
      'Authorization': store.state.token
    }
  }
  return config
})

export { securedAxiosInstance, plainAxiosInstance }
