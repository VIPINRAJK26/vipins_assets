import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";


import { Reveal } from "../animation/Reveal";


export function Contact() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", brief: "" });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const body = encodeURIComponent(`${form.brief}\n\n— ${form.name} (${form.email})`);
        window.location.href = `mailto:hello@nexus2050.dev?subject=New transmission&body=${body}`;
        setSent(true);
    };

    const field =
        "w-full border border-border bg-surface-2/60 px-4 py-3.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

    return (
        <section id="contact" className="relative overflow-hidden py-10 md:py-32">
            <div className="bg-veil absolute inset-x-0 bottom-0 top-1/4 rotate-180" />

            <div className="relative mx-auto max-w-7xl px-5 md:px-8">
                <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
                    <Reveal>
                        <p className="mono-label">// 04 — open channel</p>
                        <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                            Got a system that needs to <span className="text-neon-gradient">exist</span>?
                        </h2>
                        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                            Drop a brief. I reply within one rotation of the planet — usually with
                            questions, an approach and a realistic timeline.
                        </p>

                        <div className="mt-8 space-y-3">
                            {[
                                { icon: Mail, label: "hello@vipinraj.in", href: "mailto:hello@vipinraj.in" },
                                { icon: FaGithub, label: "github.com/VIPINRAJK26", href: "#" },
                                { icon: FaLinkedin, label: "linkedin.com/in/vipinraj26", href: "#" },
                            ].map((c) => (
                                <a
                                    key={c.label}
                                    href={c.href}
                                    className="glass-panel clip-hud group flex items-center gap-3 px-4 py-3 transition-all hover:-translate-y-0.5 hover:glow-ring"
                                >
                                    <c.icon className="h-4 w-4 text-primary transition-colors group-hover:text-accent" />
                                    <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground">
                                        {c.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={140}>
                        <form onSubmit={submit} className="glass-panel clip-hud p-5 md:p-7">
                            <div className="mono-label mb-5 flex items-center justify-between">
                                <span>transmission form</span>
                                <span className="flex gap-1">
                                    <i className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    <i className="h-1.5 w-1.5 rounded-full bg-accent" />
                                </span>
                            </div>

                            <div className="space-y-4">
                                <input
                                    required
                                    placeholder="your name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className={field}
                                />
                                <input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className={field}
                                />
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="what are we building?"
                                    value={form.brief}
                                    onChange={(e) => setForm({ ...form, brief: e.target.value })}
                                    className={`${field} resize-none`}
                                />
                            </div>

                            <button
                                type="submit"
                                className="clip-hud group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden bg-primary px-6 py-4 font-mono text-xs uppercase tracking-[0.24em] text-primary-foreground"
                            >
                                <span className="relative z-10">{sent ? "channel opened" : "transmit brief"}</span>
                                <Send className="relative z-10 h-4 w-4" />
                                <span className="absolute inset-y-0 w-16 animate-sweep bg-primary-foreground/25 blur-md" />
                            </button>

                            <p className="mt-4 text-center font-mono text-[10px] text-muted-foreground">
                                encrypted · no spam · response &lt; 24h
                            </p>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
