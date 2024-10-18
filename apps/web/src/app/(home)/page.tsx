import Navbar from "@/components/navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@toolkit/ui/tooltip";
import Header from "./header";

export default function Page() {
  return (
    <main className=" max-w-5xl w-full p-4 mx-auto">
      <Header />
    </main>
  );
}
