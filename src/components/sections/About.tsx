import { Boxes, GaugeCircle, Radar, Workflow } from "lucide-react";
import holo from "@/assets/holo-dashboard.png";
import { Reveal } from "../animation/Reveal";

const TRAITS = [
  {
    icon: Boxes,
    title: "Architecture first",
    body: "Modular boundaries, typed contracts and data models that hold up when the product doubles.",
  },
  {
    icon: GaugeCircle,
    title: "Performance obsessed",
    body: "Sub-second loads, streamed rendering, edge caching. Speed is a feature, not a phase.",
  },
  {
    icon: Workflow,
    title: "Product minded",
    body: "I ship flows, not screens — from checkout logic to permissioned admin surfaces.",
  },
  {
    icon: Radar,
    title: "Observable by default",
    body: "Logs, traces and guardrails wired in from commit one, so bugs surface before users do.",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-10 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-primary/40" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mono-label">// 01 — operator profile</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Two years in, twenty systems out —{" "}
            <span className="text-neon-gradient">built like infrastructure</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-14">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 animate-pulse-glow rounded-full bg-accent/15 blur-3xl" />
              <img
                src={holo}
                alt="Stack of floating holographic dashboard panels"
                loading="lazy"
                width={1280}
                height={1024}
                className="animate-float relative w-full"
              />
            </div>

            <div className="glass-panel clip-hud mt-6 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
              <p className="text-primary">const operator = {"{"}</p>
              <p className="pl-4">role: "full-stack engineer",</p>
              <p className="pl-4">shipped: 20+,</p>
              <p className="pl-4">domains: ["commerce", "crm", "analytics"],</p>
              <p className="pl-4">mode: "ship &amp; measure",</p>
              <p className="text-primary">{"}"};</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {TRAITS.map((t, i) => (
              <Reveal key={t.title} delay={i * 90}>
                <article
                  data-cursor-hot
                  className="glass-panel clip-hud group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:glow-ring"
                >
                  <t.icon className="h-6 w-6 text-primary transition-colors group-hover:text-accent" />
                  <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  <span className="mono-label mt-4 block !tracking-[0.2em]">0{i + 1}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
