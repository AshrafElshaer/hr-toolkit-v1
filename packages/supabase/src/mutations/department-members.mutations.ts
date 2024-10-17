import type {
  InsertDepartmentMember,
  SupabaseInstance,
  UpdateDepartmentMember,
} from "../types";

export async function create(
  supabase: SupabaseInstance,
  input: InsertDepartmentMember,
) {
  return await supabase
    .from("department_member")
    .insert(input)
    .select()
    .single();
}

export async function update(
  supabase: SupabaseInstance,
  userId: string,
  input: UpdateDepartmentMember,
) {
  return await supabase
    .from("department_member")
    .update(input)
    .eq("user_id", userId)
    .select()
    .single();
}

export async function remove(
  supabase: SupabaseInstance,
  input: {
    department_id: string;
    user_id: string;
  },
) {
  return await supabase
    .from("department_member")
    .delete()
    .eq("department_id", input.department_id)
    .eq("user_id", input.user_id)
    .select()
    .single();
}

export default {
  create,
  update,
  delete: remove,
};
