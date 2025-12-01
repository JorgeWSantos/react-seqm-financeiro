import { urlLogin } from "@src/config/env";

export const setToken = (token: string) => {
  return localStorage.setItem('@token', token);
};

export const getToken = () => {
  return localStorage.getItem('@token');
};

export const removeToken = () => {
  localStorage.removeItem('@token');
};

export const cleanUserAndToken = ({ path }: { path?: string }) => {
  removeToken();
  redirectToLoginPage({ path });
};

export const redirectToLoginPage = ({ path = '/financeiro' }: { path?: string }) => {
  const url = urlLogin + `?path=${path}`;

  window.location.href = url;
};
