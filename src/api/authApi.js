// src/api/authApi.js
const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

export async function signup(formData) {
  const res = await fetch(`${baseUrl}/user/v1/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Signup failed');
  return data;
}

export async function login(credentials) {
  const res = await fetch(`${baseUrl}/user/v1/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

export async function logoutApi() {
  const refreshToken = localStorage.getItem('refreshToken');
  const res = await fetch(`${baseUrl}/user/v1/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Logout failed');
  return data;
}

export async function refreshAccessToken(refreshToken) {
  const res = await fetch(`${baseUrl}/user/v1/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data);
  return data.accessToken;
}
