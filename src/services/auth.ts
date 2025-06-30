export const setToken = (token: string) => {
  return localStorage.setItem('@token', token);
};

export const getToken = () => {
  return localStorage.getItem('@token');
};

export const removeToken = () => {
  localStorage.removeItem('@token');
};

export const cleanUserAndToken = () => {
  removeToken();
  redirectToLoginPage();
};

export const redirectToLoginPage = () => {
  // window.location.replace(process.env.REACT_APP_LOGIN_PAGE);
};
