import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./db";

export type Client = SupabaseClient<Database>;

export * from "./db";


type StorageListFunction = SupabaseClient["storage"]["from"];
type ListFunctionReturn = ReturnType<StorageListFunction>;
type StorageFilePromise = Awaited<
  ReturnType<ListFunctionReturn["list"]>
>;
type StorageFileType = Pick<StorageFilePromise, "data">["data"];
export type StorageFile = NonNullable<StorageFileType>[number];

