import type {
  InsertEmergencyContact,
  SupabaseInstance,
  UpdateEmergencyContact,
} from "../types";

async function create(
  supabase: SupabaseInstance,
  data: InsertEmergencyContact,
) {
  return supabase.from("emergency_contacts").insert(data).select().single();
}

async function update(
  supabase: SupabaseInstance,
  data: UpdateEmergencyContact,
) {
  const { id, ...updateData } = data;
  if (!id) {
    return {
      data: null,
      error: new Error("Contact ID is required"),
    };
  }
  return supabase
    .from("emergency_contacts")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
}

async function remove(supabase: SupabaseInstance, id: string) {
  if (!id) {
    return {
      data: null,
      error: new Error("Contact ID is required"),
    };
  }
  return supabase
    .from("emergency_contacts")
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
