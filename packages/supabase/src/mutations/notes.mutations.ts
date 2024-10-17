import type { InsertNote, SupabaseInstance, UpdateNote } from "../types";

async function create(supabase: SupabaseInstance, data: InsertNote) {
  return await supabase.from("notes").insert(data).select().single();
}

async function update(supabase: SupabaseInstance, data: UpdateNote) {
  if (!data.id) {
    return {
      data: null,
      error: new Error("Note ID is required"),
    };
  }
  return await supabase
    .from("notes")
    .update(data)
    .eq("id", data.id)
    .select()
    .single();
}

async function remove(supabase: SupabaseInstance, noteId: string) {
  return await supabase
    .from("notes")
    .delete()
    .eq("id", noteId)
    .select()
    .single();
}

export default {
  create,
  update,
  delete: remove,
};
