"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@toolkit/ui/switch";
import { Label } from "@toolkit/ui/label";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center justify-between px-2 text-xs my-2">
      <Label htmlFor="airplane-mode">Dark Mode</Label>
      <Switch
        id="airplane-mode"
        isSmall
        checked={isDark}
        onCheckedChange={(checked) => setTheme(!checked ? "light" : "dark")}
      />
    </div>
  );
}
