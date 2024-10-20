import { createServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@toolkit/supabase/queries";
export  async function WelcomeMessage() {
  // const today = moment().format("YYYY-MM-DD");
  const supabase = createServerClient();
  const { data: user, error: userError } = await getCurrentUser(supabase);

  // const userPromise = getCurrentUser(supabase);
  // const eventsPromise = getEventsByDateRange(supabase, {
  // 	from: today,
  // 	to: today,
  // });

  // const [{ user }, { data: events }] = await Promise.all([
  // 	userPromise,
  // 	eventsPromise,
  // ]);

  // const eventsCount = events?.length ?? 0;

  return (
    <div className="flex flex-col gap-2 justify-center  lg:col-span-3 h-fit my-auto">
      <h1 className="text-xl md:text-2xl font-semibold">
        Welcome back, {user?.first_name} 👋
      </h1>
      <p className="text-sm text-secondary-foreground">
        You have 0 events today , 0 pending requests, and 5 unread messages.
      </p>
    </div>
  );
}

export * from "./welcome.loading";
