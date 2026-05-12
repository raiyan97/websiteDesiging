import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Search, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — M.R Digital Solutions" },
      { name: "description", content: "Insights on design, engineering, AI, and growth." },
    ],
  }),
  component: Blog,
});

const posts = [
  { cat: "Design", title: "Cinematic UI: Designing for delight", time: "6 min", color: "from-blue-500/30 to-purple-500/30", date: "May 1, 2026" },
  { cat: "AI", title: "Shipping AI agents in production", time: "9 min", color: "from-cyan-500/30 to-blue-500/30", date: "Apr 22, 2026" },
  { cat: "Growth", title: "The new SEO playbook in 2026", time: "7 min", color: "from-emerald-500/30 to-teal-500/30", date: "Apr 14, 2026" },
  { cat: "Engineering", title: "Edge-first architectures, explained", time: "8 min", color: "from-purple-500/30 to-pink-500/30", date: "Apr 3, 2026" },
  { cat: "Branding", title: "Building a brand worth obsessing over", time: "5 min", color: "from-amber-500/30 to-rose-500/30", date: "Mar 28, 2026" },
  { cat: "Mobile", title: "Native-feel apps with React Native", time: "10 min", color: "from-fuchsia-500/30 to-violet-500/30", date: "Mar 15, 2026" },
];

const cats = ["All", "Design", "AI", "Growth", "Engineering", "Branding", "Mobile"];

function Blog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = posts.filter(
    (p) =>
      (cat === "All" || p.cat === cat) &&
      p.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="Journal"
        title="Ideas worth reading"
        description="Field notes from the studio — on design, engineering, AI, and growth."
      />

      <section className="px-6 pb-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-full glass border border-border/60 bg-transparent py-3 pl-11 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                  cat === c ? "bg-gradient-primary text-white shadow-glow" : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl glass glow-border transition-all hover:-translate-y-1"
              data-cursor="hover"
            >
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.color}`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[11px] uppercase tracking-wider text-white backdrop-blur">
                  {p.cat}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{p.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.time}</span>
                </div>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
