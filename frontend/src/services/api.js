import axios from 'axios';
import { getToken } from './authHelpers';


export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';


const api = axios.create({ baseURL: API_BASE, headers: { 'Content-Type': 'application/json' },
  timeout: 10000, });


api.interceptors.request.use((config) => {
const t = getToken();
if (t) config.headers.Authorization = `Bearer ${t}`;
return config;
});


export default api;