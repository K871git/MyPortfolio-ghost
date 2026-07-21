import { create } from 'zustand';
import { api } from '../services/api';
import * as fallback from '../data/fallbackData';

const usePortfolioStore = create((set, get) => ({
  bootComplete: false,
  loading: true,
  usingFallback: false,

  identity: fallback.identity,
  contact: fallback.contact,
  aboutSteps: fallback.aboutSteps,
  skills: fallback.skills,
  experiences: fallback.experiences,
  projects: fallback.projects,

  activeProjectSlug: null,

  setBootComplete: () => set({ bootComplete: true }),
  openProject: (slug) => set({ activeProjectSlug: slug }),
  closeProject: () => set({ activeProjectSlug: null }),

  hydrate: async () => {
    try {
      const [settings, aboutSteps, skills, experiences, projects] = await Promise.all([
        api.getSettings(),
        api.getAboutSteps(),
        api.getSkills(),
        api.getExperiences(),
        api.getProjects(),
      ]);

      set({
        identity: settings.identity ?? fallback.identity,
        contact: settings.contact ?? fallback.contact,
        aboutSteps: aboutSteps?.length ? aboutSteps : fallback.aboutSteps,
        skills: Object.keys(skills || {}).length ? skills : fallback.skills,
        experiences: experiences?.length ? experiences : fallback.experiences,
        projects: projects?.length ? projects : fallback.projects,
        loading: false,
        usingFallback: false,
      });
    } catch (err) {
      // API not reachable (e.g. backend not running) — keep local seed data.
      console.info('[SYNAPSE/OS] API unreachable, running on local seed data.', err.message);
      set({ loading: false, usingFallback: true });
    }
  },

  getProjectBySlug: (slug) => get().projects.find((p) => p.slug === slug),
}));

export default usePortfolioStore;
