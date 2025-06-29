import { environment } from '../../environments/environment';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  const res = await fetch(`${environment.apiUrl}${endpoint}`, {
    ...options,
    headers,
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}

export async function publicFetch(endpoint: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const res = await fetch(`${environment.apiUrl}${endpoint}`, {
    ...options,
    headers,
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}
