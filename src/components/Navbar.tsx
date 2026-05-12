import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass-strong shadow-card" : "glass"
          }`}
        >
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary p-1.5 shadow-glow">
              <img src={logo} alt="M.R Digital Solutions logo" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold tracking-wide text-foreground">
                M.R Digital
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Solutions
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = path === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className={active ? "text-foreground" : ""}>{l.label}</span>
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-primary transition-transform duration-300 group-hover:scale-x-100 ${
                      active ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/portfolio"
              className="hidden rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 lg:inline-flex"
            >
              View Portfolio
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg glass lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 overflow-hidden rounded-2xl glass-strong p-3 lg:hidden">
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-lg px-4 py-3 text-sm text-foreground/90 hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/portfolio"
                className="mt-2 rounded-lg bg-gradient-primary px-4 py-3 text-center text-sm font-semibold text-white"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
