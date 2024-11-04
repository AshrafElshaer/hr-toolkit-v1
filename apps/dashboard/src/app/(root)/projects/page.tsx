"use client";

import Main from "@/components/main";
import { PhoneInputSimple } from "@/components/phone-input";
import { CountrySelector } from "@/components/selectors/country-selector";
import { COUNTRIES } from "@/constants/countries";
import { Badge } from "@toolkit/ui/badge";
import { Button } from "@toolkit/ui/button";
import { toast } from "sonner";

export default function ProjectsPage() {
  return (
    <Main>
      <div>
        <h1>Projects</h1>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={() =>
            toast.success("Success", {
              description: "Success description",
            })
          }
          variant="outline"
        >
          success
        </Button>
        <Button
          onClick={() =>
            toast.error("Error", {
              description: "Error description",
            })
          }
          variant="outline"
        >
          error
        </Button>
        <Button variant="outline" onClick={() => toast.warning("Warning")}>
          warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.message("Message", { description: "Message description" })
          }
        >
          Message
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info("Info", { description: "Info description" })
          }
        >
          info
        </Button>
      </div>
    </Main>
  );
}
