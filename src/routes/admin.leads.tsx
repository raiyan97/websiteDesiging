import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/admin/leads")({ component: LeadsAdmin });

type Lead = { id: string; name: string; email: string; phone: string | null; service: string | null; message: string | null; status: string; created_at: string };

function LeadsAdmin() {
  const [rows, setRows] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    const { data } = await supabase.from("contact_leads").select("*").order("created_at", { ascending: false });
    setRows((data as Lead[]) ?? []);
  };
  useEffect(() => {
    load();
    const ch = supabase.channel("leads").on("postgres_changes", { event: "*", schema: "public", table: "contact_leads" }, load).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("contact_leads").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("contact_leads").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  };

  const filtered = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Leads</h1>
      <p className="mt-1 text-sm text-muted-foreground">Real-time contact form submissions.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {["all", "new", "contacted", "won", "lost"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full border border-border/60 px-4 py-1.5 text-xs capitalize ${filter === s ? "bg-gradient-primary text-white" : "hover:bg-white/5"}`}>{s}</button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl glass glow-border p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
                  <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)} className="ml-auto rounded-full border border-border/60 bg-white/5 px-2 py-0.5 text-xs">
                    <option value="new">new</option><option value="contacted">contacted</option><option value="won">won</option><option value="lost">lost</option>
                  </select>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1 hover:text-primary"><Mail className="h-3 w-3" />{r.email}</a>
                  {r.phone && <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 hover:text-primary"><Phone className="h-3 w-3" />{r.phone}</a>}
                  {r.service && <span>· {r.service}</span>}
                </div>
                {r.message && <p className="mt-2 text-sm text-muted-foreground">{r.message}</p>}
              </div>
              <button onClick={() => remove(r.id)} className="rounded-md p-1.5 hover:bg-white/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-sm text-muted-foreground">No leads.</div>}
      </div>
    </div>
  );
}
