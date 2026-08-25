import orb from "@/assets/orb.png";
import { Reveal } from "../animation/Reveal";

const CLUSTERS = [
  {
    label: "Interface",
    level: 96,
    items: ["React 19", "TypeScript", "Tailwind", "Framer-grade motion", "Design systems"],
  },
  {
    label: "Core",
    level: 91,
    items: ["Python", "FastAPi", "RESTful APIs", "Authentication", "Django"],
  },
  {
    label: "Data",
    level: 88,
    items: ["PostgreSQL", "Redis", "Row-level security", "Realtime streams"],
  },
  {
    label: "Ops",
    level: 84,
    items: ["CI/CD", "Observability", "Load testing", "AI tooling"],
  },
];

export function Tools() {
  return (
    <section id="tools" className="relative overflow-hidden py-20 md:py-32">
      <div className="grid-floor absolute inset-0 opacity-50" />
      <img
        src={orb}
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -left-40 bottom-0 w-[520px] animate-spin-slow opacity-25 mix-blend-screen"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mono-label">// 03 — instrument cluster</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            The <span className="text-neon-gradient">toolchain</span> behind every launch
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CLUSTERS.map((c, i) => (
            <Reveal key={c.label} delay={i * 100}>
              <article
                data-cursor-hot
                className="glass-panel clip-hud group h-full p-5 transition-all duration-300 hover:-translate-y-1.5 hover:glow-ring"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-bold">{c.label}</h3>
                  <span className="font-mono text-xs text-primary">{c.level}%</span>
                </div>

                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-[width] duration-1000"
                    style={{ width: `${c.level}%`, backgroundImage: "var(--gradient-neon)" }}
                  />
                </div>

                <ul className="mt-5 space-y-2.5">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1 w-1 rotate-45 bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 overflow-hidden border-y border-border py-3">
          <div className="animate-marquee flex w-max items-center gap-10 font-display text-xl font-bold uppercase tracking-[0.18em] text-muted-foreground/60 md:text-3xl">
            {Array.from({ length: 2 }).map((_, r) => (
              <span key={r} className="flex items-center gap-10">
                <span>ship fast</span>
                <span className="text-primary">✦</span>
                <span>measure everything</span>
                <span className="text-accent">✦</span>
                <span>scale quietly</span>
                <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
