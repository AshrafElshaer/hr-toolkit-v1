import type { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@v1/logger";
import { eq } from "drizzle-orm";
import { UserTable, db } from "../db";

export async function getCurrentUser(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, data.user.id),
  });

  return user;
}

export async function getUser() {
  // const supabase = createClient();

  // try {
  //   const result = await supabase.auth.getUser();

  //   return result;
  // } catch (error) {
  //   logger.error(error);

  //   throw error;
  // }
  return {
    data: {
      user: {
        id: "123",
        email: "test@test.com",
        name: "Test",
      },
    },
  };
}

export async function getUsers() {
  // const supabase = createClient();

  // try {
  //   const result = await supabase.from("users").select("*");

  //   return result;
  // } catch (error) {
  //   logger.error(error);

  //   throw error;
  // }
  return {
    data: [
      {
        id: "123",
        email: "test@test.com",
        name: "Test",
      },
    ],
  };
}
