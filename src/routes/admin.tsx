import { createFileRoute, Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, Briefcase, FileText, MessageSquare, Inbox, Settings, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — M.R Digital Solutions" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const isLogin = loc.pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!user && !isLogin) nav({ to: "/admin/login" });
    if (user && !isAdmin && !isLogin) nav({ to: "/admin/login" });
    if (user && isAdmin && isLogin) nav({ to: "/admin/dashboard" });
  }, [user, isAdmin, loading, isLogin, nav]);

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">Loading…</div>;
  }

  if (isLogin) return <Outlet />;
  if (!user || !isAdmin) return null;

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
    { to: "/admin/blogs", label: "Blogs", icon: FileText },
    { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { to: "/admin/leads", label: "Leads", icon: Inbox },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border/60 glass p-5 md:block">
          <Link to="/" className="block font-display text-lg font-semibold">M.R Admin</Link>
          <nav className="mt-8 space-y-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground" activeProps={{ className: "bg-white/10 text-foreground" }}>
                <l.icon className="h-4 w-4" /> {l.label}
              </Link>
            ))}
          </nav>
          <button onClick={async () => { await signOut(); nav({ to: "/admin/login" }); }} className="mt-8 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </aside>
        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
