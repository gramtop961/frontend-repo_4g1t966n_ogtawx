const BASE = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || 'http://localhost:8000';

async function http(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  base: BASE,
  trending: (limit = 12) => http(`/api/trending?limit=${limit}`),
  search: (params = {}) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') q.set(k, v);
    });
    return http(`/api/search?${q.toString()}`);
  },
  sneaker: (id) => http(`/api/sneakers/${id}`),
  saveDesign: (data) => http(`/api/designs`, { method: 'POST', body: JSON.stringify(data) }),
  listDesigns: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/api/designs${q ? `?${q}` : ''}`);
  },
  createAlert: (data) => http(`/api/alerts`, { method: 'POST', body: JSON.stringify(data) }),
  listAlerts: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return http(`/api/alerts${q ? `?${q}` : ''}`);
  },
};
