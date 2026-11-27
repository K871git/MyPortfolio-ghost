import { useEffect, useState } from 'react';
import BootSequence from './components/boot/BootSequence';
import GhostBackground from './components/layout/GhostBackground';
import ScreenOverlay from './components/layout/ScreenOverlay';
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
import useTheme from './hooks/useTheme';
import ThemeTransition from './components/ui/ThemeTransition';

export default function App() {
  const bootComplete   = usePortfolioStore((s) => s.bootComplete);
  const setBootComplete = usePortfolioStore((s) => s.setBootComplete);
  const hydrate        = usePortfolioStore((s) => s.hydrate);

  const identity   = usePortfolioStore((s) => s.identity);
  const contact    = usePortfolioStore((s) => s.contact);
  const aboutSteps = usePortfolioStore((s) => s.aboutSteps);
  const skills     = usePortfolioStore((s) => s.skills);
  const experiences = usePortfolioStore((s) => s.experiences);

  const { theme, toggleTheme } = useTheme();

  const [skipBoot] = useState(() => sessionStorage.getItem('ghost-os-booted') === '1');

  useEffect(() => {
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBootComplete() {
    sessionStorage.setItem('ghost-os-booted', '1');
    setBootComplete();
  }

  return (
    <>
      <CustomCursor />

      {!bootComplete && !skipBoot && (
        <div className="force-dark">
          <BootSequence identity={identity} onComplete={handleBootComplete} />
        </div>
      )}

      {(bootComplete || skipBoot) && (
        <div className="relative">
          <ThemeTransition theme={theme} />
          <GhostBackground theme={theme} />
          <ScreenOverlay />
          <Nav
            status={usePortfolioStore.getState().identity.availability}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          <main className="relative z-10">
            <Hero identity={identity} contact={contact} />
            <ExperienceLog experiences={experiences} />
            <ProjectsSection />
            <SkillsIDE skills={skills} />
            <ProcessFlow steps={aboutSteps} />
            <ResumeViewer identity={identity} />
            <ContactTerminal contact={contact} status="Available for opportunities" />
          </main>

          <Footer identity={identity} contact={contact} />
        </div>
      )}
    </>
  );
}
