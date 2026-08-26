import { useEffect, useState } from "react";
import { Menu, MoonStar, SunMedium, X } from "lucide-react";
import { useTheme } from "../themes/use-theme";

const LINKS = [
  { id: "hero", label: "Index" },
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "tools", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-50 md:hidden">
        <div className="glass-panel flex items-center justify-between px-4 py-3">
          <button onClick={() => go("hero")} className="font-mono text-sm font-bold tracking-widest">
            <span className="text-neon-gradient">VIPIN</span>
          </button>
          <div className="flex items-center gap-2">
            <ThemeButton theme={theme} toggle={toggle} />
            <button
              aria-label="Open menu"
              onClick={() => setOpen((o) => !o)}
              className="clip-hud flex h-9 w-9 items-center justify-center border border-border bg-surface-2 text-foreground"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="glass-panel mx-3 mt-2 overflow-hidden rounded-lg p-2">
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="flex w-full items-center justify-between px-3 py-3 text-left font-display text-lg text-foreground"
              >
                {l.label}
                <span className="font-mono text-[10px] text-muted-foreground">
                  0{i + 1}
                </span>
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* desktop rail */}
      <header className="fixed inset-x-0 top-0 z-50 hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <button onClick={() => go("hero")} className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-primary/50 font-mono text-xs text-primary clip-hud">
              &lt;/&gt;
            </span>
            <span className="font-display text-sm font-bold tracking-[0.3em]">
              <span className="text-neon-gradient">VIPIN</span>
            </span>
          </button>

          <nav className="glass-panel clip-hud flex items-center gap-1 px-2 py-1.5">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                  active === l.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-primary shadow-[0_0_10px_var(--neon)]" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeButton theme={theme} toggle={toggle} />
            <button
              onClick={() => go("contact")}
              className="clip-hud relative overflow-hidden border border-primary/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Transmit
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function ThemeButton({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="group clip-hud relative flex h-9 w-16 items-center border border-border bg-surface-2 px-1"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center bg-primary text-primary-foreground transition-transform duration-300 ${
          theme === "dark" ? "translate-x-0" : "translate-x-7"
        }`}
      >
        {theme === "dark" ? <MoonStar className="h-3.5 w-3.5" /> : <SunMedium className="h-3.5 w-3.5" />}
      </span>
      <span className="pointer-events-none absolute inset-0 -z-10 opacity-40" />
    </button>
  );
}
