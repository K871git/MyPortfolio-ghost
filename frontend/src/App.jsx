import { useEffect, useState } from 'react';
import BootSequence from './components/boot/BootSequence';
import DotGrid from './components/boot/DotGrid';
import CustomCursor from './components/layout/CustomCursor';
import Nav from './components/layout/Nav';
import Hero from './components/layout/Hero';
import Footer from './components/layout/Footer';
import ProcessFlow from './components/about/ProcessFlow';
import SkillsIDE from './components/skills/SkillsIDE';
import ProjectsSection from './components/projects/ProjectsList';
import ExperienceLog from './components/experience/ExperienceLog';
import ResumeViewer from './components/resume/ResumeViewer';
import ContactTerminal from './components/contact/ContactTerminal';
import usePortfolioStore from './store/usePortfolioStore';

export default function App() {
  const bootComplete = usePortfolioStore((s) => s.bootComplete);
  const setBootComplete = usePortfolioStore((s) => s.setBootComplete);
  const hydrate = usePortfolioStore((s) => s.hydrate);

  const identity = usePortfolioStore((s) => s.identity);
  const contact = usePortfolioStore((s) => s.contact);
  const aboutSteps = usePortfolioStore((s) => s.aboutSteps);
  const skills = usePortfolioStore((s) => s.skills);
  const experiences = usePortfolioStore((s) => s.experiences);

  const [skipBoot] = useState(() => sessionStorage.getItem('synapse-booted') === '1');

  useEffect(() => {
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBootComplete() {
    sessionStorage.setItem('synapse-booted', '1');
    setBootComplete();
  }

  return (
    <>
      <CustomCursor />

      {!bootComplete && !skipBoot && (
        <BootSequence identity={identity} onComplete={handleBootComplete} />
      )}

      {(bootComplete || skipBoot) && (
        <div className="relative">
          <DotGrid />
          <Nav status={usePortfolioStore.getState().identity.availability} />

          <main className="relative z-10">
            <Hero identity={identity} />
            <ProcessFlow steps={aboutSteps} />
            <SkillsIDE skills={skills} />
            <ProjectsSection />
            <ExperienceLog experiences={experiences} />
            <ResumeViewer identity={identity} />
            <ContactTerminal contact={contact} status="Available for opportunities" />
          </main>

          <Footer identity={identity} />
        </div>
      )}
    </>
  );
}
