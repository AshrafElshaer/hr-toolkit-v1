import { createServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@toolkit/supabase/queries";
import { redirect } from "next/navigation";

import type { ReactNode } from "react";

import DashboardHeader from "@/components/dashboard-header/dashboard-header";
import MainSidebar from "@/components/sidebar/main-sidebar";

async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = createServerClient();
  const { data: user } = await getCurrentUser(supabase);

  if (!user) {
    redirect("/auth");
    return null;
  }

  return (
    <>
      <MainSidebar currentUser={user} />
      <DashboardHeader currentUser={user} />
      {children}
    </>
  );
}
export default DashboardLayout;
