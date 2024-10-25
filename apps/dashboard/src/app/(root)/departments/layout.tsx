import { createServerClient } from "@/lib/supabase/server";
import { getCurrentUser, getUserDepartment } from "@toolkit/supabase/queries";
import { redirect } from "next/navigation";
export default async function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const { data: user } = await getCurrentUser(supabase);

  const userRole = user?.role;

  if (!user) {
    return redirect("/auth");
  }

  if (userRole === "admin") {
    return children;
  }

  const { data } = await getUserDepartment(supabase, user.id);

  if (!data?.department) {
    return redirect("/");
  }

  return redirect(`/departments/${data.department.id}`);
}
