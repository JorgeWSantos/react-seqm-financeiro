// src/services/api.ts
import axios from 'axios';
import { getToken } from './auth';

// ---
// ABQM.API
// TODO: ALTERAR PARA UMA NOVA API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_GERAL,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const apiResultados = axios.create({
  baseURL: import.meta.env.VITE_API_RESULTADOS,
});

export { api, apiResultados };
