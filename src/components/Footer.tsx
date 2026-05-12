import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary shadow-glow">
                <span className="font-display text-sm font-bold text-white">MR</span>
              </div>
              <div>
                <div className="font-display text-base font-semibold">M.R Digital</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Solutions Pvt. Ltd.
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Building cinematic digital experiences with AI, code, and design.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg glass transition-colors hover:text-primary"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {[
                ["About", "/about"],
                ["Services", "/services"],
                ["Portfolio", "/portfolio"],
                ["Case Studies", "/case-studies"],
                ["Blog", "/blog"],
              ].map(([l, h]) => (
                <li key={l}>
                  <Link to={h} className="transition-colors hover:text-foreground">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {[
                "Website Development",
                "Mobile Apps",
                "AI Automation",
                "Branding",
                "Digital Marketing",
              ].map((l) => (
                <li key={l} className="transition-colors hover:text-foreground">
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Get in Touch
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <a href="mailto:info@mrdigitalsolutions.in" className="hover:text-foreground">
                  info@mrdigitalsolutions.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <a href="tel:+916388719053" className="hover:text-foreground">
                  +91 63887 19053
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© 2026 M.R Digital Solutions Pvt. Ltd. All Rights Reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
