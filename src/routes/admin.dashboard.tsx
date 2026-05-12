import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, FileText, MessageSquare, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({ component: Dashboard });

function Dashboard() {
  const [stats, setStats] = useState({ portfolio: 0, blogs: 0, testimonials: 0, leads: 0 });

  useEffect(() => {
    (async () => {
      const [p, b, t, l] = await Promise.all([
        supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
        supabase.from("blogs").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_leads").select("id", { count: "exact", head: true }),
      ]);
      setStats({ portfolio: p.count ?? 0, blogs: b.count ?? 0, testimonials: t.count ?? 0, leads: l.count ?? 0 });
    })();
  }, []);

  const cards = [
    { label: "Portfolio Projects", value: stats.portfolio, icon: Briefcase },
    { label: "Blog Posts", value: stats.blogs, icon: FileText },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquare },
    { label: "Leads", value: stats.leads, icon: Inbox },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Overview of your content & inquiries.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl glass glow-border p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</span>
              <c.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-3 text-3xl font-semibold">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
