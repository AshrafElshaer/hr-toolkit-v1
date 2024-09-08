import { Button } from "@v1/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@v1/ui/sheet";
import { NotebookIcon, X } from "lucide-react";
import type React from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
type Props = {
  children: React.ReactNode;
};
export default function NoteSheet({ children: trigger }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full max-w-lg">
        <div className="flex flex-col gap-4  h-full p-4">
          <SheetHeader>
            <div className="flex justify-between items-center">
              <SheetTitle className="flex items-center">
                <FaRegNoteSticky className="size-4 mr-2" />
                <span className="font-semibold">New Note</span>
              </SheetTitle>
              <SheetClose>
                <X className="size-4" />
              </SheetClose>
            </div>
            <SheetDescription>
              Create a new note or edit an existing one. Notes are a great way
              to keep track of important information, ideas, or tasks.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1  rounded-md p-4 border ">
            editor
          </div>
          <Button variant="destructive" className="w-fit">
            Delete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
