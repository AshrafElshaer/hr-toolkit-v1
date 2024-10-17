import moment from "moment";
import type {
  InsertTimeSheet,
  InsertTimeSheetBreak,
  UpdateTimeSheet,
} from "../types";
import type { SupabaseInstance } from "../types";

export async function create(
  supabase: SupabaseInstance,
  data: InsertTimeSheet,
) {
  return await supabase.from("time_sheet").insert(data).select().single();
}

export async function update(
  supabase: SupabaseInstance,
  timeSheetId: string,
  data: UpdateTimeSheet,
) {
  return await supabase
    .from("time_sheet")
    .update(data)
    .eq("id", timeSheetId)
    .select()
    .single();
}

export async function takeBreak(
  supabase: SupabaseInstance,
  data: InsertTimeSheetBreak,
) {
  return await supabase.from("time_sheet_break").insert(data).select().single();
}

export async function endBreak(
  supabase: SupabaseInstance,
  timeSheetId: string,
) {
  return await supabase
    .from("time_sheet_break")
    .update({ break_end: moment().toDate().toISOString() })
    .eq("time_sheet_id", timeSheetId)
    .select()
    .single();
}

export default {
  create,
  update,
  takeBreak,
  endBreak,
};
