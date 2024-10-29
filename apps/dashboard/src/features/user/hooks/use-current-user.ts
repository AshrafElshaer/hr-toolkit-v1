import { createClient } from "@/lib/supabase/client";
import { getCurrentUser } from "@toolkit/supabase/queries";

import { useQuery } from "@tanstack/react-query";


export function useCurrentUser() {

  const supabase = createClient();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await getCurrentUser(supabase);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
 
  return data;
}
