import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-28">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-70" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
        {eyebrow && (
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--electric)]" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-4xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl">
          <span className="text-gradient">{title}</span>
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
