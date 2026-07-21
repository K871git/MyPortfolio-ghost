import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  timeout: 8000,
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
