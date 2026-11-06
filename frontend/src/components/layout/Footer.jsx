import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer({ identity, contact }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-os flex flex-col sm:flex-row items-center justify-between gap-5 font-mono text-xs text-muted text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span>© {new Date().getFullYear()} {identity?.name ?? 'Kishor Sanjay Gangarde'}</span>
          <span className="hidden sm:inline text-white/15">·</span>
          <span className="text-white/40">ghost/os v1.0.0</span>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-5">
          {contact?.github && (
            <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="text-muted hover:text-ink transition-colors duration-200">
              <Github size={15} />
            </a>
          )}
          {contact?.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="text-muted hover:text-ink transition-colors duration-200">
              <Linkedin size={15} />
            </a>
          )}
          {contact?.email && (
            <a href={`mailto:${contact.email}`} aria-label="Email"
              className="text-muted hover:text-ink transition-colors duration-200">
              <Mail size={15} />
            </a>
          )}
        </div>

        <span className="text-white/30">built with React · Laravel · PostgreSQL</span>
      </div>
    </footer>
  );
}
