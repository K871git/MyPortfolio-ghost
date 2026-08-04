export default function Footer({ identity }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-os flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted text-center sm:text-left">
        <span>© {new Date().getFullYear()} {identity.name} — made by Kishor</span>
        <span className="opacity-70">operator_id: ghost-k871</span>
        <span>ghost/os v1.0.0 — built with React, Laravel, PostgreSQL</span>
      </div>
    </footer>
  );
}
