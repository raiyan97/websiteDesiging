import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Mail, Lock, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const { signIn, resetPassword } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("info@mrdigitalsolutions.in");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) { toast.error(error); return; }
    toast.success("Welcome back");
    nav({ to: "/admin/dashboard" });
  };

  const reset = async () => {
    if (!email) return toast.error("Enter your email first");
    const { error } = await resetPassword(email);
    if (error) toast.error(error); else toast.success("Reset link sent — check your email");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl glass-strong glow-border p-8">
        <div className="mb-6 text-center">
          <div className="font-display text-2xl font-semibold">Admin Access</div>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your site</p>
        </div>
        <label className="mt-4 block text-xs uppercase tracking-wider text-muted-foreground">Email</label>
        <div className="relative mt-2">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-border/60 bg-white/5 pl-10 pr-4 py-3 text-sm outline-none focus:border-primary" />
        </div>
        <label className="mt-4 block text-xs uppercase tracking-wider text-muted-foreground">Password</label>
        <div className="relative mt-2">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-border/60 bg-white/5 pl-10 pr-4 py-3 text-sm outline-none focus:border-primary" />
        </div>
        <button type="submit" disabled={busy} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign In
        </button>
        <button type="button" onClick={reset} className="mt-4 block w-full text-center text-xs text-muted-foreground hover:text-primary">
          Forgot password?
        </button>
      </form>
    </div>
  );
}
