"use client";
import Main from "@/components/main";

import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";
import { toast } from "sonner";

// export const metadata = {
//   title: "Home",
// };

export default function Page() {
  return (
    <Main className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              toast("default");
            }}
          >
            default
          </Button>
          <Button
            variant="success"
            onClick={() => {
              toast.success("success");
            }}
          >
            success
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              toast.warning("success");
            }}
          >
            warning
          </Button>
          {/* <Button variant="secondary">secondary</Button> */}
          <Button
            variant="destructive"
            onClick={() => {
              toast.error("error", {
                description: "This is a description",
              });
            }}
          >
            danger
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              toast.info("info", {
                description: "This is a description",
              });
            }}
          >
            info
          </Button>
        </div>

        <h1 className="text-2xl font-bold text-foreground">Hello World</h1>
        <h1 className="text-2xl font-bold text-secondary-foreground">
          Hello World
        </h1>

        {/* <SignOut /> */}
      </div>
    </Main>
  );
}
