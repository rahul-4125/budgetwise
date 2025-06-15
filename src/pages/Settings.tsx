
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-10 shadow my-10">
      <div className="text-2xl font-bold mb-4">Settings</div>
      <div className="text-muted-foreground mb-2">Profile and app preferences coming soon.</div>
      <div className="mb-4">
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
      <button className="px-5 py-2 bg-secondary rounded font-semibold text-primary mt-2 cursor-not-allowed opacity-70" disabled>
        Sign Out (Supabase Auth pending)
      </button>
    </div>
  );
};

export default Settings;
