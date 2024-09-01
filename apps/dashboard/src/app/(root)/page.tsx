import { SignOut } from "@/components/sign-out";

import { getUser } from "@v1/supabase/queries";

import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  const { data } = await getUser();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2">
          <Button>default</Button>
          <Button variant="success">success</Button>
          <Button variant="warning">warning</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="destructive">danger</Button>
          <Button variant="ghost">ghost</Button>
        </div>
        <div className="flex gap-2">
          <Badge>default</Badge>
          <Badge variant="success">success</Badge>
          <Badge variant="warning">warning</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="destructive">danger</Badge>
        </div>

        <h1 className="text-2xl font-bold text-foreground">Hello World</h1>
        <h1 className="text-2xl font-bold text-secondary-foreground">
          Hello World
        </h1>

        {/* <SignOut /> */}
      </div>
    </div>
  );
}
