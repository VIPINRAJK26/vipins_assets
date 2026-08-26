export function Footer() {
  return (
    <footer className="relative border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 text-center md:flex-row md:justify-between md:px-8 md:text-left">
        <p className="font-display text-sm font-bold tracking-[0.3em]">
          <span className="text-neon-gradient">VIPIN</span>
          <span className="text-muted-foreground">/2026</span>
        </p>
        <p className="font-mono text-[11px] text-muted-foreground">
          built at the edge · {new Date().getFullYear()} · all systems nominal
        </p>
      </div>
    </footer>
  );
}
