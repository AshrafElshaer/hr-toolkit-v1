import type { InsertUser, SupabaseInstance, UpdateUser } from "../types";

export async function create(supabase: SupabaseInstance, data: InsertUser) {
  return await supabase.from("user").insert(data).select().single();
}

export async function update(supabase: SupabaseInstance, data: UpdateUser) {
  if (!data.id) {
    return {
      data: null,
      error: new Error("User id is required"),
    };
  }

  return await supabase
    .from("user")
    .update(data)
    .eq("id", data.id)
    .select()
    .single();
}

export default {
  create,
  update,
};
