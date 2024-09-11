"use client";
import AdvancedEditor from "@/components/editors/advanced";
import SimpleEditor from "@/components/editors/simple-editor";
import { Button } from "@v1/ui/button";
import { ScrollArea } from "@v1/ui/scroll-area";
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
import type { EditorInstance, JSONContent } from "novel";
import type React from "react";
import { useState } from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import { useDebounceCallback } from "usehooks-ts";
type Props = {
  children: React.ReactNode;
};
export default function NoteSheet({ children: trigger }: Props) {
  const [content, setContent] = useState<JSONContent>({
    type: "doc",
    content: [
      {
        type: "heading",
        level: 1,
        content: [{ type: "text", text: "New Note" }],
      },
    ],
  });

  const debouncedUpdates = useDebounceCallback(async (json: JSONContent) => {
    setContent(json);
  }, 500);
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full max-w-xl">
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

          <div className="flex-1 flex flex-col overflow-hidden">
            <AdvancedEditor
              initialValue={content}
              onChange={debouncedUpdates}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
