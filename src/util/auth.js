// src/util/auth.js
export function isAuthenticated() {
  return !!localStorage.getItem('accessToken');
}

export function setTokens(accessToken, refreshToken,userName) {
  localStorage.setItem('userName',userName);
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function getUserName(){
  return localStorage.getItem('userName');
}

export function clearTokens() {
  localStorage.removeItem('userName');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
