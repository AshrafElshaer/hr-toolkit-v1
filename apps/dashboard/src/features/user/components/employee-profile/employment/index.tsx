import { createServerClient } from "@/lib/supabase/server";
import {
  getDepartmentMemberByUserId,
  getUserById,
} from "@toolkit/supabase/queries";
import { Card } from "@toolkit/ui/card";
import EmploymentForm from "./employment-form";

export async function Employment({ userId }: { userId: string }) {
  const supabase = createServerClient();
  const [{ data: user, error: userError }, { data: departmentMember, error: departmentMemberError }] = await Promise.all([
    getUserById(supabase, userId),
    getDepartmentMemberByUserId(supabase, userId)
  ]);

  if (userError || departmentMemberError) {
    return <div>Error getting employment</div>;
  }

  return (
    <Card className="flex flex-col gap-4 w-full p-4 ">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Employment Details</h3>
      </div>
      <EmploymentForm user={user} departmentMember={departmentMember} />
    </Card>
  );
}

export { EmploymentLoading } from "./employment.loading";
