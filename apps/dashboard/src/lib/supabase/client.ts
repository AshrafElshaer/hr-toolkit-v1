import { env } from "@/env.mjs";
import { createBrowserClient } from "@supabase/ssr";
type Options = {
  isAdmin?: boolean;
};
export function createClient({ isAdmin = false }: Options = {}) {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
