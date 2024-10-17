import type {
  InsertDepartment,
  SupabaseInstance,
  UpdateDepartment,
} from "../types";

export async function create(
  supabase: SupabaseInstance,
  input: InsertDepartment,
) {
  return await supabase.from("department").insert(input).select().single();
}

export async function update(
  supabase: SupabaseInstance,
  input: UpdateDepartment,
) {
  if (!input.id) {
    return {
      data: null,
      error: new Error("Department ID is required"),
    };
  }
  return await supabase
    .from("department")
    .update(input)
    .eq("id", input.id)
    .select()
    .single();
}

export async function remove(supabase: SupabaseInstance, id: string) {
  return await supabase
    .from("department")
    .delete()
    .eq("id", id)
    .select()
    .single();
}

export default {
  create,
  update,
  delete: remove,
};
