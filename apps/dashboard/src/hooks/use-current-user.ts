import { getCurrentUserAction } from "@/actions/users.actions";
import { createClient } from "@/lib/supabase/client";

import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  const supabase = createClient();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await getCurrentUserAction();
      return result?.data;
    },
  });
  return data;
}
