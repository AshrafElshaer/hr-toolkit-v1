import Navbar from "@/components/navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@toolkit/ui/tooltip";

export default function Page() {
  return (
    <main className=" max-w-4xl w-full p-4 mx-auto">
      <Navbar />
    </main>
  );
}
