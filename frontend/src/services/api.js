import axios from 'axios';

// In local dev (npm run dev), Vite proxies /api to localhost:8000.
// In production builds, default straight to the live Render backend —
// this no longer depends on a Netlify dashboard env var being set correctly.
const baseURL = import.meta.env.VITE_API_BASE
  || (import.meta.env.DEV ? '/api' : 'https://myportfolio-ghost.onrender.com/api');

const client = axios.create({
  baseURL,
  timeout: 45000,
  headers: { Accept: 'application/json' },
});

// Small helper so callers get plain data, not the axios envelope.
const unwrap = (promise) => promise.then((res) => res.data.data);

export const api = {
  getProjects: () => unwrap(client.get('/projects')),
  getProject: (slug) => unwrap(client.get(`/projects/${slug}`)),
  getExperiences: () => unwrap(client.get('/experiences')),
  getSkills: () => unwrap(client.get('/skills')),
  getAboutSteps: () => unwrap(client.get('/about')),
  getSettings: () => unwrap(client.get('/settings')),
  sendContactMessage: (payload) => unwrap(client.post('/contact', payload)),
};

export default client;