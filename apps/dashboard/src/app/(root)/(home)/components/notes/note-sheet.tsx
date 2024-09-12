"use client";
import { createNoteAction } from "@/actions/notes";
import AdvancedEditor from "@/components/editors/advanced";
import SimpleEditor from "@/components/editors/simple-editor";
import type { Note } from "@v1/supabase/types";
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
import { Loader, NotebookIcon, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import type { EditorInstance, JSONContent } from "novel";
import type React from "react";
import { useState } from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";
type Props = {
  note?: Note;
  children?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
};
export default function NoteSheet({
  children: trigger,
  note,
  isOpen,
  setIsOpen,
}: Props) {
  console.log({ note });
  const { execute, status, isExecuting } = useAction(createNoteAction, {
    onSuccess: (data) => {
      toast.success("Note created successfully");
      setIsOpen?.(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });
  const [content, setContent] = useState<JSONContent>(
    note?.content
      ? note.content as JSONContent
      :
    {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            level: 1,
          },
        },
      ],
    },
  );

  const debouncedUpdates = useDebounceCallback(async (json: JSONContent) => {
    setContent(json);
  }, 500);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? <SheetTrigger asChild>{trigger}</SheetTrigger> : null}
      <SheetContent className="w-full max-w-3xl">
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
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => console.log(content)}>
              content
            </Button>

            <Button
              onClick={() => {
                const noteTitle = content?.content?.find(
                  (element) => element.content?.[0]?.text,
                )?.content?.[0]?.text;
                console.log(noteTitle);
                if (!noteTitle) {
                  toast.error("Note cannot be empty");
                  return;
                }
                execute({
                  title: noteTitle,
                  content: JSON.stringify(content),
                });
              }}
              disabled={isExecuting}
            >
              {isExecuting ? (
                <Loader className="size-4 mr-2 animate-spin" />
              ) : null}
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
