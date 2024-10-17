
import type { InsertAddress, UpdateAddress } from "../types";
import type { SupabaseInstance } from "../types";


async function create(supabase: SupabaseInstance, data: InsertAddress) {
  return await supabase.from("addresses").insert(data).select().single();
}

async function update(supabase: SupabaseInstance, data: UpdateAddress) {
  if (!data.id) {
    return {
      data: null,
      error: new Error("Address ID is required"),
    };
  }
  return await supabase
    .from("addresses")
    .update(data)
    .eq("id", data.id)
    .select()
    .single();
}

async function remove(supabase: SupabaseInstance, id: string) {
  return await supabase
    .from("addresses")
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
