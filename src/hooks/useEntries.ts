
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useEntries() {
  // Fetch all entries for the current user, newest first
  return useQuery({
    queryKey: ["entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useAddEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Omit<any, "id" | "user_id" | "created_at">) => {
      // Fetch current authed user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");
      const { data, error } = await supabase
        .from("entries")
        .insert([{ ...entry, user_id: user.id }])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    }
  });
}
