import type { SupabaseClient } from "@supabase/supabase-js";
import { eq, or } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import {
  DepartmentMemberTable,
  DepartmentTable,
  OrganizationMemberTable,
  UserTable,
  db,
} from "../db";
import { safeAsync } from "../utils";

export async function getCurrentUser(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, data.user.id),
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return user;
}

export const getUserById = async (id: string) => {
  const result = await safeAsync(async () => {
    return await db.query.UserTable.findFirst({
      where: eq(UserTable.id, id),
    });
  });
  return result;
};

// export function getUserById(id: string) {
//   return unstable_cache(
//     async () => {
//       const result = await safeAsync(async () => {
//         return await db.query.UserTable.findFirst({
//           where: eq(UserTable.id, id),
//         });
//       });
//       return result;
//     },
//     [id],
//     {
//       revalidate: 180,
//       tags: [`user-${id}`],
//     }
//   );
// }

export function getEmployees(orgId: string, deptId?: string) {
  return unstable_cache(
    async () => {
      const { data, error } = await safeAsync(async () => {
        if (deptId) {
          return await db
            .select()
            .from(DepartmentMemberTable)
            .where(eq(DepartmentMemberTable.department_id, deptId))
            .innerJoin(
              UserTable,
              eq(DepartmentMemberTable.user_id, UserTable.id),
            );
        }

        return await db
          .select({
            user: UserTable,
            department: DepartmentTable,
          })
          .from(OrganizationMemberTable)
          .where(eq(OrganizationMemberTable.organization_id, orgId))
          .innerJoin(
            UserTable,
            eq(OrganizationMemberTable.user_id, UserTable.id),
          )
          .leftJoin(
            DepartmentMemberTable,
            eq(DepartmentMemberTable.user_id, UserTable.id),
          )
          .leftJoin(
            DepartmentTable,
            eq(DepartmentMemberTable.department_id, DepartmentTable.id),
          );
      });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    [orgId, deptId ?? ""],
    {
      revalidate: 180,
      tags: [`org-${orgId}-dept-${deptId ?? ""}`],
    },
  );
}
