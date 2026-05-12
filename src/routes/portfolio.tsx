import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell, PageHeader } from "@/components/PageShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — M.R Digital Solutions" },
      { name: "description", content: "Selected work across web, mobile, AI, branding, and e-commerce." },
    ],
  }),
  component: Portfolio,
});

const categories = [
  "All", "Business", "Hotel", "Restaurant", "Education",
  "E-commerce", "Mobile", "AI", "Branding",
] as const;

const projects = [
  { tag: "E-commerce", title: "Aurora Store", color: "from-blue-500/40 to-purple-500/40" },
  { tag: "Hotel", title: "Velora Resorts", color: "from-purple-500/40 to-pink-500/40" },
  { tag: "AI", title: "Nimbus AI", color: "from-cyan-500/40 to-blue-500/40" },
  { tag: "Restaurant", title: "Saffron & Smoke", color: "from-orange-500/40 to-rose-500/40" },
  { tag: "Education", title: "Lumen Academy", color: "from-emerald-500/40 to-teal-500/40" },
  { tag: "Mobile", title: "Pulse Fitness", color: "from-fuchsia-500/40 to-violet-500/40" },
  { tag: "Business", title: "Northwind Group", color: "from-blue-500/40 to-cyan-500/40" },
  { tag: "Branding", title: "Halo Studio", color: "from-amber-500/40 to-pink-500/40" },
  { tag: "AI", title: "Atlas Copilot", color: "from-indigo-500/40 to-purple-500/40" },
];

function Portfolio() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered = projects.filter((p) => active === "All" || p.tag === active);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Portfolio"
        title="Work that defines our craft"
        description="A curated selection of projects shipped across industries — built with cinematic care."
      />

      <section className="px-6 pb-8">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                active === c
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl glass glow-border aspect-[4/5]"
                  data-cursor="hover"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 z-10">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/80">{p.tag}</div>
                    <div className="mt-1 font-display text-2xl font-semibold text-white">
                      {p.title}
                    </div>
                  </div>
                  <div className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur transition-transform duration-500 group-hover:rotate-45">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
