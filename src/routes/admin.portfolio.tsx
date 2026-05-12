import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Upload, X } from "lucide-react";

export const Route = createFileRoute("/admin/portfolio")({ component: PortfolioAdmin });

type Row = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  project_url: string;
  tags: string[];
  featured: boolean;
};

const empty: Row = { title: "", slug: "", category: "", description: "", image_url: "", project_url: "", tags: [], featured: false };

function PortfolioAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("portfolio_projects").select("*").order("created_at", { ascending: false });
    setRows((data as Row[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setBusy(true);
    const payload = { ...editing, slug: editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") };
    const { error } = editing.id
      ? await supabase.from("portfolio_projects").update(payload).eq("id", editing.id)
      : await supabase.from("portfolio_projects").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  const upload = async (file: File) => {
    if (!editing) return;
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file, { upsert: true });
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    setEditing({ ...editing, image_url: data.publicUrl });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Portfolio</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your projects.</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl glass glow-border overflow-hidden">
            {r.image_url && <img src={r.image_url} alt={r.title} className="h-40 w-full object-cover" />}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.category}</div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(r)} className="rounded-md p-1.5 hover:bg-white/10"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={() => remove(r.id!)} className="rounded-md p-1.5 hover:bg-white/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="text-sm text-muted-foreground">No projects yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl rounded-3xl glass-strong glow-border p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">{editing.id ? "Edit" : "New"} Project</h2>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Input label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Input label="Slug (optional)" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <Input label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} />
              <Input label="Project URL" value={editing.project_url} onChange={(v) => setEditing({ ...editing, project_url: v })} />
              <Input label="Tags (comma)" value={editing.tags.join(", ")} onChange={(v) => setEditing({ ...editing, tags: v.split(",").map((t) => t.trim()).filter(Boolean) })} />
              <label className="flex items-end gap-2 text-sm"><input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured</label>
            </div>
            <div className="mt-3">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Description</label>
              <textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="mt-2 w-full rounded-xl border border-border/60 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary" />
            </div>
            <div className="mt-3">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Cover Image</label>
              <div className="mt-2 flex items-center gap-3">
                {editing.image_url && <img src={editing.image_url} alt="" className="h-16 w-16 rounded-lg object-cover" />}
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs hover:bg-white/5">
                  <Upload className="h-3.5 w-3.5" /> Upload
                  <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
                </label>
                <input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} placeholder="or paste URL" className="flex-1 rounded-xl border border-border/60 bg-white/5 px-3 py-2 text-xs outline-none focus:border-primary" />
              </div>
            </div>
            <button onClick={save} disabled={busy} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60">
              {busy ? "Saving…" : "Save Project"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-border/60 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-primary" />
    </div>
  );
}
