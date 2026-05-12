import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Smartphone,
  Megaphone,
  Search,
  Bot,
  Palette,
  Video,
  PenTool,
  Share2,
  Terminal,
  Star,
  Quote,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const HeroScene = lazy(() =>
  import("@/components/HeroScene").then((m) => ({ default: m.HeroScene }))
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M.R Digital Solutions — Premium Digital Agency" },
      {
        name: "description",
        content:
          "We craft cinematic websites, mobile apps, AI automation, branding, and marketing experiences for ambitious brands.",
      },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Code2, title: "Website Development", desc: "Production-grade web apps with cinematic UI." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native-feel iOS & Android experiences." },
  { icon: Megaphone, title: "Digital Marketing", desc: "Performance campaigns that convert." },
  { icon: Search, title: "SEO Optimization", desc: "Rank higher with technical & content SEO." },
  { icon: Bot, title: "AI Automation", desc: "Workflows powered by modern AI agents." },
  { icon: Palette, title: "Branding Solutions", desc: "Identity systems that resonate." },
  { icon: Video, title: "Video Editing", desc: "Cinematic edits for ads & social." },
  { icon: PenTool, title: "Graphic Designing", desc: "Pixel-perfect visual systems." },
  { icon: Share2, title: "Social Media Management", desc: "Always-on creative & strategy." },
  { icon: Terminal, title: "Software Development", desc: "Custom platforms & internal tools." },
];

const projects = [
  { tag: "E-commerce", title: "Aurora Store", color: "from-blue-500/30 to-purple-500/30" },
  { tag: "Hotel", title: "Velora Resorts", color: "from-purple-500/30 to-pink-500/30" },
  { tag: "AI Product", title: "Nimbus AI", color: "from-cyan-500/30 to-blue-500/30" },
  { tag: "Restaurant", title: "Saffron & Smoke", color: "from-orange-500/30 to-rose-500/30" },
  { tag: "Education", title: "Lumen Academy", color: "from-emerald-500/30 to-teal-500/30" },
  { tag: "Mobile App", title: "Pulse Fitness", color: "from-fuchsia-500/30 to-violet-500/30" },
];

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Founder, Nimbus AI",
    quote: "M.R Digital delivered a product launch that blew our investors away. Cinematic and fast.",
  },
  {
    name: "Priya Verma",
    role: "CMO, Velora Resorts",
    quote: "Bookings tripled after the relaunch. Their attention to detail is unmatched.",
  },
  {
    name: "James Carter",
    role: "CEO, Aurora Store",
    quote: "From branding to checkout — every pixel feels premium. Best agency we've worked with.",
  },
];

const stats = [
  ["120+", "Projects Delivered"],
  ["48", "Global Clients"],
  ["8+", "Years Crafting"],
  ["99%", "Client Retention"],
];

function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden pt-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
        <div className="pointer-events-none absolute inset-0 grid-bg" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Premium Digital Agency · Est. 2018
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="text-gradient">Transforming Ideas</span>
              <br />
              <span className="text-foreground">Into Powerful</span>
              <br />
              <span className="text-gradient-primary">Digital Experiences</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              We build premium websites, mobile apps, AI-powered systems, branding
              experiences, and digital solutions that help businesses grow faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full glass glow-border px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-white/10"
              >
                Explore Portfolio
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Book Free Consultation →
              </Link>
            </motion.div>

            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-semibold text-gradient">{n}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[420px] lg:col-span-5 lg:h-[560px]">
            <div className="absolute inset-0">
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
            </div>
            <div className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-primary opacity-20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                What we do
              </div>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                Services engineered for{" "}
                <span className="text-gradient">scale</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              An end-to-end studio. From the first sketch to the production deploy — we own
              the entire experience.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl glass glow-border p-6 transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:opacity-100">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              About the studio
            </div>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              A boutique studio for{" "}
              <span className="text-gradient">ambitious brands</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              M.R Digital Solutions is a full-service digital agency engineering
              cinematic websites, intelligent products, and conversion-driven
              marketing. We blend strategy, design, and technology to ship
              experiences that move metrics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
              >
                Our Story <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full glass glow-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/10"
              >
                Work With Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 lg:col-span-6"
          >
            {stats.map(([n, l]) => (
              <div
                key={l}
                className="rounded-2xl glass glow-border p-6 transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="font-display text-4xl font-semibold text-gradient">{n}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Selected Work
            </div>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              Projects that{" "}
              <span className="text-gradient-primary">define craft</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl glass glow-border aspect-[4/5]"
                data-cursor="hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-80`} />
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-x-6 bottom-6 z-10">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/80">{p.tag}</div>
                  <div className="mt-1 font-display text-2xl font-semibold text-white">
                    {p.title}
                  </div>
                  <div className="mt-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    View case study <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur transition-transform duration-500 group-hover:rotate-45">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <Link
              to="/portfolio"
              data-cursor="hover"
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-primary px-8 py-4 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.05]"
            >
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-primary opacity-60 blur-xl animate-pulse" />
              View Full Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Testimonials
            </div>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              Loved by <span className="text-gradient">founders worldwide</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl glass glow-border p-7"
              >
                <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/30" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mt-5 text-sm leading-relaxed text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary font-display text-sm font-semibold text-white"
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl glass-strong glow-border p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-80" />
          <div className="relative">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Ready to build something <span className="text-gradient-primary">unforgettable</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Tell us about your idea — we'll come back with a strategy in 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
              >
                Start Your Project <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:info@mrdigitalsolutions.in"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-white/10"
              >
                info@mrdigitalsolutions.in
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
