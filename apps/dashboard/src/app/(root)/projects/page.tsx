"use client";

import Main from "@/components/main";
import { PhoneInputSimple } from "@/components/phone-input";
import { CountrySelector } from "@/components/selectors/country-selector";
import { COUNTRIES } from "@/constants/countries";
import { Badge } from "@toolkit/ui/badge";

export default function ProjectsPage() {
  return (
    <Main>
      <div>
        <h1>Projects</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge size="lg">Default</Badge>
        <Badge variant="outline" size="lg">
          Draft
        </Badge>
        <Badge variant="secondary" size="lg">
          Pending
        </Badge>
        <Badge variant="destructive">Failed</Badge>
        <Badge variant="warning">warning</Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    </Main>
  );
}
