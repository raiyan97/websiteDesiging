import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { CheckCircle2, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — M.R Digital Solutions" },
      { name: "description", content: "How we shipped products that moved real metrics." },
    ],
  }),
  component: CaseStudies,
});

const cases = [
  {
    client: "Velora Resorts",
    industry: "Hospitality",
    problem: "Outdated booking flow, low direct bookings, slow site.",
    solution: "Cinematic redesign, headless CMS, conversion-optimized booking engine.",
    tech: ["Next.js", "Sanity", "Stripe", "Edge"],
    results: ["+212% direct bookings", "1.4s LCP", "+38% AOV"],
  },
  {
    client: "Nimbus AI",
    industry: "AI SaaS",
    problem: "Investor-grade launch in 6 weeks with zero brand assets.",
    solution: "Brand identity, marketing site, product UI, onboarding flow.",
    tech: ["React", "Three.js", "Supabase", "OpenAI"],
    results: ["$2.1M raised", "12k waitlist", "TechCrunch feature"],
  },
  {
    client: "Aurora Store",
    industry: "E-commerce",
    problem: "Generic Shopify theme limiting brand expression and CR.",
    solution: "Custom storefront, AR product views, AI product recs.",
    tech: ["Shopify Hydrogen", "Three.js", "TS"],
    results: ["+96% conversion", "+54% AOV", "Awwwards SOTD"],
  },
];

function CaseStudies() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Case Studies"
        title="Outcomes, not just outputs"
        description="A look at how strategy, design, and engineering combine to ship products that move metrics."
      />
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          {cases.map((c, i) => (
            <article
              key={c.client}
              className="group relative overflow-hidden rounded-3xl glass glow-border p-8 sm:p-12"
            >
              <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gradient-primary opacity-10 blur-3xl transition-opacity group-hover:opacity-20" />
              <div className="grid gap-10 lg:grid-cols-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                    Case 0{i + 1} · {c.industry}
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                    {c.client}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-5 lg:col-span-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-accent">Problem</div>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/90">{c.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-accent">Solution</div>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/90">{c.solution}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-accent">Results</div>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      {c.results.map((r) => (
                        <div key={r} className="flex items-center gap-2 rounded-lg glass px-3 py-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
