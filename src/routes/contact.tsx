import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — M.R Digital Solutions" },
      { name: "description", content: "Tell us about your project. We respond within 24 hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("contact_leads").insert({
      name: form.name,
      email: form.email,
      service: form.company || null,
      phone: null,
      message: `${form.budget ? `Budget: ${form.budget}\n\n` : ""}${form.message}`,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Message sent — we'll respond within 24 hours.");
    setSent(true);
    setForm({ name: "", email: "", company: "", budget: "", message: "" });
  };


  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something cinematic"
        description="Share a few details about your project — we'll come back with a strategy in 24 hours."
      />

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {[
              { icon: Mail, label: "Email", value: "info@mrdigitalsolutions.in", href: "mailto:info@mrdigitalsolutions.in" },
              { icon: Phone, label: "Call us", value: "+91 63887 19053", href: "tel:+916388719053" },
{ icon: FaWhatsapp, label: "WhatsApp", value: "+91 63887 19053", href: "https://wa.me/916388719053" },
              { icon: MapPin, label: "Based in", value: "India · Working Worldwide" },
              { icon: Clock, label: "Response time", value: "Within 24 hours" },
            ].map((c) => {
              const Inner = (
                <div className="group flex items-start gap-4 rounded-2xl glass glow-border p-5 transition-all hover:-translate-y-0.5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                    <c.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="mt-0.5 text-sm font-medium text-foreground">{c.value}</div>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {Inner}
                </a>
              ) : (
                <div key={c.label}>{Inner}</div>
              );
            })}
          </div>

          <form
            onSubmit={submit}
            className="relative overflow-hidden rounded-3xl glass-strong glow-border p-8 lg:col-span-3"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
            <h2 className="font-display text-2xl font-semibold">Tell us about your project</h2>
            <p className="mt-1 text-sm text-muted-foreground">We read every message. Promise.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Your name" placeholder="Jane Doe" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Email" type="email" placeholder="you@company.com" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Company" placeholder="Acme Inc." value={form.company} onChange={(v) => setForm({ ...form, company: v })} required={false} />
              <Field label="Budget" placeholder="$5k — $25k" value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} required={false} />
            </div>
            <div className="mt-4">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Project details</label>
              <textarea
                required rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your goals, timeline, and inspirations..."
                className="mt-2 w-full rounded-xl border border-border/60 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] disabled:opacity-60"
            >
              {busy ? "Sending…" : sent ? "Message Sent ✓" : (<>Send Message <Send className="h-4 w-4" /></>)}
            </button>
            {sent && (
              <p className="mt-3 text-xs text-primary">Thanks — we'll respond within 24 hours.</p>
            )}
          </form>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, type = "text", placeholder, value, onChange, required = true }: { label: string; type?: string; placeholder?: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type} required={required} placeholder={placeholder}
        value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border/60 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
