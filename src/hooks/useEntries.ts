
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

// Typesafe insert type for the entries table, minus id, created_at
type InsertEntry = Omit<TablesInsert<"entries">, "id" | "user_id" | "created_at">;

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
    // Expect a properly-shaped InsertEntry object
    mutationFn: async (entry: InsertEntry) => {
      // Fetch current authed user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");
      // Construct insert payload: must have all required fields!
      const insertPayload = {
        ...entry,
        user_id: user.id,
      };
      const { data, error } = await supabase
        .from("entries")
        .insert([insertPayload]) // pass as array
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
