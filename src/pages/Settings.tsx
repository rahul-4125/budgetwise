
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/HeroSection";

const Settings = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function fetchUser() {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      if (!ignore) {
        setEmail(data.user?.email ?? null);
        setLoading(false);
      }
    }
    fetchUser();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate("/signin");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-10 shadow my-10 space-y-8">
      <HeroSection
        title={<>Settings</>}
        subtitle={<>Personalize your BudgetWise experience and manage your profile.</>}
      />
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <label className="font-semibold block mb-2">Email</label>
            <input
              className="border px-3 py-2 rounded w-full bg-input"
              value={
                loading
                  ? "Loading..."
                  : email
                  ? email
                  : "Not signed in"
              }
              disabled
            />
          </div>
          <button
            className="px-5 py-2 bg-secondary rounded font-semibold text-primary mt-2 hover:bg-secondary/80 transition"
            type="button"
            onClick={handleSignOut}
            disabled={loading}
          >
            Sign Out
          </button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">
            Customize your BudgetWise preferences and interface. (Feature coming soon!)
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
