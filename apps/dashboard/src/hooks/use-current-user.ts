import { getCurrentUserAction } from "@/actions/user";
import { createClient } from "@/lib/supabase/client";
import { getCurrentUser } from "@toolkit/supabase/queries";

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
