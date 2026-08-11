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
  // Full case-study detail for the currently open modal — fetched
  // separately from the lightweight `projects` list, since that list
  // intentionally omits the heavy fields (architecture, schema, etc).
  activeProjectDetail: null,

  setBootComplete: () => set({ bootComplete: true }),

  openProject: (slug) => {
    // Show whatever we already have immediately (lightweight list entry,
    // or the fully-detailed local fallback if that's all that's loaded)
    // so the modal never opens on a blank state — then fetch the real
    // full detail and swap it in once it arrives.
    const immediate =
      get().projects.find((p) => p.slug === slug) ??
      fallback.projects.find((p) => p.slug === slug) ??
      null;

    set({ activeProjectSlug: slug, activeProjectDetail: immediate });

    api
      .getProject(slug)
      .then((detail) => {
        // Guard against the user having already closed/switched projects
        // by the time this resolves.
        if (get().activeProjectSlug === slug && detail) {
          set({ activeProjectDetail: detail });
        }
      })
      .catch(() => {
        // Backend unreachable — fall back to the fully-detailed local
        // seed data for this project, if we have it.
        const fb = fallback.projects.find((p) => p.slug === slug);
        if (get().activeProjectSlug === slug && fb) {
          set({ activeProjectDetail: fb });
        }
      });
  },

  closeProject: () => set({ activeProjectSlug: null, activeProjectDetail: null }),

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
      console.info('[GHOST/OS] API unreachable, running on local seed data.', err.message);
      set({ loading: false, usingFallback: true });
    }
  },
}));

export default usePortfolioStore;
