// src/services/api.ts
import axios from 'axios';
import { getToken } from './auth';

const headersDefault = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

// ---
// ABQM.API
// TODO: ALTERAR PARA UMA NOVA API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    ...headersDefault,
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (!token) {
    // Cancela a requisição se não houver token
    return Promise.reject(new Error('Token não encontrado'));
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const apiResultados = axios.create({
  baseURL: import.meta.env.VITE_API_RESULTADOS, // Agora só precisa do prefixo /api
});

export { api, apiResultados };
