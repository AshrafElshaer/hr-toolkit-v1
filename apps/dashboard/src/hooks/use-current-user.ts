import { createClient } from "@/lib/supabase/client";
import { getCurrentUser } from "@v1/supabase/queries";

import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  const supabase = createClient();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUser(supabase);
      return user;
    },
  });
}
