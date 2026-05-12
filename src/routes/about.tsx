import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Target, Eye, Heart, Users, Award, Rocket } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — M.R Digital Solutions" },
      { name: "description", content: "A studio of strategists, designers, and engineers crafting cinematic digital products." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Target, title: "Mission", text: "Empower ambitious brands with technology that feels magical." },
  { icon: Eye, title: "Vision", text: "Become the most respected design-engineering studio in the region." },
  { icon: Heart, title: "Values", text: "Craft, honesty, speed, and obsessive attention to detail." },
];

const team = [
  { name: "Mohit R.", role: "Founder & Creative Director" },
  { name: "Riya S.", role: "Head of Engineering" },
  { name: "Arjun K.", role: "Lead Designer" },
  { name: "Neha P.", role: "AI Engineer" },
];

function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About Us"
        title="A studio of builders, designers, and dreamers"
        description="We are M.R Digital Solutions — a multidisciplinary team obsessed with crafting cinematic digital experiences that move metrics and minds."
      />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl glass glow-border p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <v.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Why teams <span className="text-gradient">trust us</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: Users, n: "48+", l: "Global Clients" },
              { icon: Award, n: "12", l: "Industry Awards" },
              { icon: Rocket, n: "120+", l: "Products Shipped" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-5 rounded-2xl glass p-6">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-display text-3xl font-semibold text-gradient">{s.n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            The <span className="text-gradient-primary">team</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="group rounded-2xl glass glow-border p-6 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-primary font-display text-xl font-bold text-white shadow-glow transition-transform group-hover:scale-110">
                  {m.name[0]}
                </div>
                <div className="mt-4 font-display text-base font-semibold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
