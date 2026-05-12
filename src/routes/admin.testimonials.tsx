import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Upload, X, Star } from "lucide-react";

export const Route = createFileRoute("/admin/testimonials")({ component: TestimonialsAdmin });

type Row = { id?: string; name: string; role: string; company: string; content: string; image_url: string; rating: number };
const empty: Row = { name: "", role: "", company: "", content: "", image_url: "", rating: 5 };

function TestimonialsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setRows((data as Row[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setBusy(true);
    const { error } = editing.id
      ? await supabase.from("testimonials").update(editing).eq("id", editing.id)
      : await supabase.from("testimonials").insert(editing);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Saved"); setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  };

  const upload = async (file: File) => {
    if (!editing) return;
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage.from("testimonials").upload(path, file, { upsert: true });
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("testimonials").getPublicUrl(path);
    setEditing({ ...editing, image_url: data.publicUrl });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage client quotes.</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl glass glow-border p-5">
            <div className="flex items-center gap-3">
              {r.image_url ? <img src={r.image_url} alt="" className="h-12 w-12 rounded-full object-cover" /> : <div className="h-12 w-12 rounded-full bg-gradient-primary" />}
              <div className="flex-1">
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}{r.company ? ` · ${r.company}` : ""}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(r)} className="rounded-md p-1.5 hover:bg-white/10"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => remove(r.id!)} className="rounded-md p-1.5 hover:bg-white/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mt-2 flex">{Array.from({ length: r.rating || 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}</div>
            <p className="mt-2 text-sm text-muted-foreground">"{r.content}"</p>
          </div>
        ))}
        {rows.length === 0 && <div className="text-sm text-muted-foreground">No testimonials yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl rounded-3xl glass-strong glow-border p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">{editing.id ? "Edit" : "New"} Testimonial</h2>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Input label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
              <Input label="Role" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} />
              <Input label="Company" value={editing.company} onChange={(v) => setEditing({ ...editing, company: v })} />
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Rating (1-5)</label>
                <input type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="mt-2 w-full rounded-xl border border-border/60 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Quote</label>
              <textarea rows={4} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="mt-2 w-full rounded-xl border border-border/60 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary" />
            </div>
            <div className="mt-3">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Avatar</label>
              <div className="mt-2 flex items-center gap-3">
                {editing.image_url && <img src={editing.image_url} alt="" className="h-12 w-12 rounded-full object-cover" />}
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs hover:bg-white/5">
                  <Upload className="h-3.5 w-3.5" /> Upload
                  <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
                </label>
                <input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} placeholder="or URL" className="flex-1 rounded-xl border border-border/60 bg-white/5 px-3 py-2 text-xs outline-none focus:border-primary" />
              </div>
            </div>
            <button onClick={save} disabled={busy} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60">
              {busy ? "Saving…" : "Save"}
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
