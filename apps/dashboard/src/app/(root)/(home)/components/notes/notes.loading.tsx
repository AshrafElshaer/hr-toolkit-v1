import { Button } from "@v1/ui/button";
import { Card, CardContent } from "@v1/ui/card";
import { cn } from "@v1/ui/cn";
import { Separator } from "@v1/ui/separator";
import { Skeleton } from "@v1/ui/skeleton";
import { PlusIcon } from "lucide-react";
import { FaRegNoteSticky } from "react-icons/fa6";

export default function NotesLoading() {
  return (
    <Card className="w-full min-h-[300px] max-h-[350px] md:max-h-fit flex flex-col p-0 overflow-hidden">
      <div className="flex gap-2 items-center p-2">
        <FaRegNoteSticky className="size-4" />
        <span className="font-semibold">Notes</span>
        <Button size="xs" variant="secondary" className="ml-auto" disabled>
          <PlusIcon className="size-3 mr-2" />
          New Note
        </Button>
      </div>

      <Separator className="w-full" />
      <CardContent className="p-0 flex-grow overflow-scroll scrollbar-hide">
        {[...Array(2)].map((_, index) => (
          <div key={index.toString()}>
            <Skeleton className="h-7 w-full rounded-none mb-2" />
            {[...Array(3)].map((_, noteIndex) => (
              <Skeleton
                key={noteIndex.toString()}
                className={cn(
                  "h-4 mb-2",
                  noteIndex === 0 && "w-3/4",
                  noteIndex === 1 && "w-2/4",
                  noteIndex === 2 && "w-1/3",
                )}
              />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
