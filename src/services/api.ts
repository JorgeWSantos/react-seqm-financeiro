// src/services/api.ts
import axios from 'axios';
import { getToken } from './auth';
import { urlApiGeneral, urlApiFinanceiro } from '@src/config/env';

// ---
// ABQM.API
// TODO: ALTERAR PARA UMA NOVA API
const api = axios.create({
  baseURL: urlApiGeneral,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const apiFinanceiro = axios.create({
  baseURL: urlApiFinanceiro,
});

export { api, apiFinanceiro };
