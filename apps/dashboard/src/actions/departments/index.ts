"use server";
import { getDepartments } from "@toolkit/supabase/queries";
import { z } from "zod";
import { authActionClient } from "../safe-action";

export const getDepartmentsAction = authActionClient
  .metadata({
    name: "get-departments",
  })
  .action(async ({ ctx: { user } }) => {
    const { data, error } = await getDepartments(
      user.user_metadata.organization_id,
    );
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });
