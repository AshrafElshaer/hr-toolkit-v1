"use client";
import { createClient } from "@/lib/supabase/client";

export function useSupabase() {
  return createClient();
}
