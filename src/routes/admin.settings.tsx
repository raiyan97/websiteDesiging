import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: SettingsAdmin });

type SiteSettings = {
  site_title: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
};

const defaults: SiteSettings = {
  site_title: "M.R Digital Solutions",
  tagline: "Premium Digital Agency",
  email: "info@mrdigitalsolutions.in",
  phone: "+916388719053",
  whatsapp: "916388719053",
  address: "India",
};

function SettingsAdmin() {
  const [settings, setSettings] = useState<SiteSettings>(defaults);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.from("settings").select("value").eq("key", "site").maybeSingle().then(({ data }) => {
      if (data?.value) setSettings({ ...defaults, ...(data.value as SiteSettings) });
    });
  }, []);

  const save = async () => {
    setBusy(true);
    const { error } = await supabase.from("settings").upsert({ key: "site", value: settings });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Settings saved");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Site-wide configuration.</p>

      <div className="mt-8 space-y-4 rounded-3xl glass glow-border p-6">
        {(Object.keys(defaults) as Array<keyof SiteSettings>).map((k) => (
          <div key={k}>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">{k.replace(/_/g, " ")}</label>
            <input value={settings[k]} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} className="mt-2 w-full rounded-xl border border-border/60 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
        ))}
        <button onClick={save} disabled={busy} className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60">
          {busy ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
