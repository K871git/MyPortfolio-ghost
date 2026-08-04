export default function ScreenOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />
    </div>
  );
}
