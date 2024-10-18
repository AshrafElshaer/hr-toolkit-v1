import { Button, buttonVariants } from "@toolkit/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@toolkit/ui/navigation-menu";
import Link from "next/link";
import LogoSVG from "./logo-svg";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-2 gap-4  border rounded-lg w-11/12 max-w-5xl mx-auto sticky top-4 z-50">
      <Link href="/">
        <LogoSVG className="size-8 fill-foreground" />
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="font-medium text-sm transition-colors text-foreground hover:text-foreground/70"
        >
          Features
        </button>
        <button
          type="button"
          className="font-medium text-sm transition-colors text-foreground hover:text-foreground/70"
        >
          Updates
        </button>
        <button
          type="button"
          className="font-medium text-sm transition-colors text-foreground hover:text-foreground/70"
        >
          Pricing
        </button>
      </div>

      <Link
        href="https://dashboard.hrtoolkit.app"
        target="_blank"
        className={buttonVariants({ variant: "secondary" })}
      >
        Sign in
      </Link>
    </nav>
  );
}
