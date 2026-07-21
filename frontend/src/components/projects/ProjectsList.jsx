import SectionHeading from '../ui/SectionHeading';
import ProjectRow from './ProjectRow';
import CaseStudyOverlay from './CaseStudyOverlay';
import usePortfolioStore from '../../store/usePortfolioStore';
import { AnimatePresence } from 'framer-motion';

export default function ProjectsSection() {
  const projects = usePortfolioStore((s) => s.projects);
  const openProject = usePortfolioStore((s) => s.openProject);
  const closeProject = usePortfolioStore((s) => s.closeProject);
  const activeSlug = usePortfolioStore((s) => s.activeProjectSlug);
  const activeProject = usePortfolioStore((s) => s.getProjectBySlug(activeSlug));

  return (
    <section id="projects" className="section relative">
      <div className="container-os">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects, as case studies"
          description="Each one includes the architecture, the schema, the trade-offs, and what I'd do differently now."
        />

        <div className="mt-16">
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} onOpen={openProject} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && <CaseStudyOverlay project={activeProject} onClose={closeProject} />}
      </AnimatePresence>
    </section>
  );
}
