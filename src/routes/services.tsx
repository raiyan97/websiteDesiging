import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import {
  Code2, Smartphone, Megaphone, Search, Bot, Palette, Video, PenTool, Share2, Terminal, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — M.R Digital Solutions" },
      { name: "description", content: "Web, mobile, AI, branding, marketing, and design services." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Code2, title: "Website Development", desc: "Next-gen marketing sites, dashboards, and SaaS platforms.", tags: ["Next.js", "React", "Edge"] },
  { icon: Smartphone, title: "Mobile App Development", desc: "Cross-platform apps with native performance.", tags: ["React Native", "Expo", "Swift"] },
  { icon: Megaphone, title: "Digital Marketing", desc: "Performance campaigns across Meta, Google, LinkedIn.", tags: ["Meta", "Google", "LinkedIn"] },
  { icon: Search, title: "SEO Optimization", desc: "Technical, on-page, and content SEO that ranks.", tags: ["Tech SEO", "Content", "Schema"] },
  { icon: Bot, title: "AI Automation", desc: "Agents, copilots, and end-to-end workflow automation.", tags: ["LLMs", "Agents", "RAG"] },
  { icon: Palette, title: "Branding Solutions", desc: "Identity, naming, and visual systems for modern brands.", tags: ["Identity", "Logo", "Guidelines"] },
  { icon: Video, title: "Video Editing", desc: "Cinematic edits for ads, reels, and product launches.", tags: ["After Effects", "Premiere"] },
  { icon: PenTool, title: "Graphic Designing", desc: "Editorial, marketing, and product graphics.", tags: ["Figma", "Illustrator"] },
  { icon: Share2, title: "Social Media Management", desc: "Always-on content engine and creative direction.", tags: ["Strategy", "Creative"] },
  { icon: Terminal, title: "Software Development", desc: "Custom platforms, APIs, and internal tools.", tags: ["Node", "Python", "Cloud"] },
];

function Services() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Services"
        title="Everything you need, under one roof"
        description="A full-stack creative & engineering studio. Strategy, design, code, content, growth — handled."
      />
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group relative overflow-hidden rounded-2xl glass glow-border p-7 transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:opacity-100">
                Discuss project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
