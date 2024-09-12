import type { SupabaseClient } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { UserTable, db } from "../db";

export * from "./timesheet";
export * from "./notes";

export async function getCurrentUser(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, data.user.id),
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return user;
}
