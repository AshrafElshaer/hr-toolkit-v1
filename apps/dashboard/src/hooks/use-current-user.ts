import { createClient } from "@/lib/supabase/client";
import { getCurrentUser } from "@v1/supabase/queries";
import { getCurrentUserAction } from "@/actions/user";

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
