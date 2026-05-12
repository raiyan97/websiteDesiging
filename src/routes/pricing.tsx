import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — M.R Digital Solutions" },
      { name: "description", content: "Transparent packages for startups, scale-ups, and enterprises." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    name: "Launch",
    monthly: 999,
    yearly: 9590,
    desc: "For startups going from idea to launch.",
    features: ["5-page premium website", "Brand identity kit", "Basic SEO setup", "1 round of revisions", "30-day support"],
  },
  {
    name: "Scale",
    monthly: 2499,
    yearly: 23990,
    desc: "For growing teams that want a flagship product.",
    features: ["Full marketing site or app", "Advanced animations & 3D", "CMS + dashboard", "SEO + analytics", "90-day support", "Priority delivery"],
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: 0,
    yearly: 0,
    desc: "Custom engagements for ambitious teams.",
    features: ["Dedicated team", "AI automation & integrations", "Multi-platform delivery", "SLA + dedicated PM", "Quarterly strategy", "Unlimited iterations"],
  },
];

function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <PageShell>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="No hidden fees. Pick a plan or design a custom engagement with our team."
      />

      <section className="px-6 pb-4">
        <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-full glass p-1.5">
          {(["Monthly", "Yearly"] as const).map((label, i) => {
            const active = yearly === (i === 1);
            return (
              <button
                key={label}
                onClick={() => setYearly(i === 1)}
                className={`relative flex-1 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  active ? "bg-gradient-primary text-white shadow-glow" : "text-muted-foreground"
                }`}
              >
                {label}
                {label === "Yearly" && (
                  <span className="ml-2 rounded-full bg-white/15 px-1.5 py-0.5 text-[10px]">−20%</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {tiers.map((t) => {
            const price = yearly ? t.yearly : t.monthly;
            return (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-3xl p-8 transition-all ${
                  t.popular
                    ? "glass-strong glow-border shadow-elevated lg:scale-[1.04]"
                    : "glass glow-border"
                }`}
              >
                {t.popular && (
                  <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-glow">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </div>
                )}
                <div className="font-display text-xl font-semibold">{t.name}</div>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  {price === 0 ? (
                    <span className="font-display text-4xl font-semibold text-gradient">Custom</span>
                  ) : (
                    <>
                      <span className="font-display text-5xl font-semibold text-gradient">
                        ${price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">/{yearly ? "yr" : "mo"}</span>
                    </>
                  )}
                </div>
                <ul className="mt-7 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    t.popular
                      ? "bg-gradient-primary text-white shadow-glow hover:scale-[1.03]"
                      : "glass hover:bg-white/10"
                  }`}
                >
                  {price === 0 ? "Talk to sales" : "Get started"}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
