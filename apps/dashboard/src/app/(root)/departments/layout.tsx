import { createServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@toolkit/supabase/queries";
export default async function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
