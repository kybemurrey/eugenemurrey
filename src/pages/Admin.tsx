import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Trash2, CheckCircle2, LogOut, Inbox } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    let active = true;

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      if (!active) return;
      setIsAdmin(admin);
      if (!admin) {
        setLoading(false);
        return;
      }
      await fetchSubmissions();
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth", { replace: true });
    });

    init();
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
      return;
    }
    setSubmissions(data ?? []);
  };

  const toggleRead = async (s: Submission) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ read: !s.read })
      .eq("id", s.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setSubmissions((prev) => prev.map((x) => (x.id === s.id ? { ...x, read: !s.read } : x)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setSubmissions((prev) => prev.filter((x) => x.id !== id));
    toast({ title: "Deleted" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto glass-card p-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Access denied</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Your account is not authorized to view this page.
              </p>
              <Button onClick={signOut} variant="outline" className="rounded-full">
                <LogOut size={16} className="mr-2" /> Sign out
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const unread = submissions.filter((s) => !s.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="section-label mb-2">Admin</p>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Contact <span className="gradient-text">Submissions</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  {submissions.length} total · {unread} unread
                </p>
              </div>
              <Button onClick={signOut} variant="outline" size="sm" className="rounded-full">
                <LogOut size={14} className="mr-2" /> Sign out
              </Button>
            </div>

            {submissions.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <Inbox className="mx-auto text-muted-foreground mb-4" size={40} />
                <p className="text-muted-foreground">No submissions yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((s) => (
                  <div
                    key={s.id}
                    className={`glass-card p-6 transition-colors ${
                      !s.read ? "border-primary/40" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{s.name}</h3>
                          {!s.read && <Badge variant="default">New</Badge>}
                        </div>
                        <a
                          href={`mailto:${s.email}`}
                          className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 mt-1"
                        >
                          <Mail size={12} /> {s.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground">
                          {new Date(s.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm whitespace-pre-wrap text-foreground/90 mb-4">
                      {s.message}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => toggleRead(s)}
                      >
                        <CheckCircle2 size={14} className="mr-1" />
                        {s.read ? "Mark unread" : "Mark read"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full text-destructive hover:text-destructive"
                        onClick={() => remove(s.id)}
                      >
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;