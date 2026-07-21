export default function Footer({ identity }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-os flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
        <span>© {new Date().getFullYear()} {identity.name}</span>
        <span>synapse/os v2.4.0 — built with React, Laravel, PostgreSQL</span>
      </div>
    </footer>
  );
}
