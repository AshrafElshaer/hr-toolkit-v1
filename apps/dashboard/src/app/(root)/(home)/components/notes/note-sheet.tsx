"use client";
import {
  createNoteAction,
  deleteNoteAction,
  updateNoteAction,
} from "@/actions/notes";
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
import { useEffect, useState } from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";
type Props = {
  note?: Note;
  children?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
};

const DEFAULT_CONTENT = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
    },
  ],
};
export default function NoteSheet({
  children: trigger,
  note,
  isOpen,
  setIsOpen,
}: Props) {
  const [content, setContent] = useState<JSONContent>(
    note?.content ? (note.content as JSONContent) : DEFAULT_CONTENT,
  );
  const isNewNote = !note;

  const { execute: createNote, isExecuting: isCreating } = useAction(
    createNoteAction,
    {
      onSuccess: (data) => {
        toast.success("Note created successfully");
        setIsOpen?.(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const { execute: updateNote, isExecuting: isUpdating } = useAction(
    updateNoteAction,
    {
      onSuccess: (data) => {
        toast.success("Note updated successfully");
        setIsOpen?.(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const { execute: deleteNote, isExecuting: isDeleting } = useAction(
    deleteNoteAction,
    {
      onSuccess: () => {
        toast.success("Note deleted successfully");
        setIsOpen?.(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const debouncedUpdates = useDebounceCallback(async (json: JSONContent) => {
    setContent(json);
  }, 500);

  function handleNewNote() {
    const noteTitle = getNoteTitle(content);
    if (!noteTitle) {
      toast.error("Note cannot be empty");
      return;
    }
    createNote({
      title: noteTitle,
      content: JSON.stringify(content),
    });
  }

  function handleUpdateNote() {
    if (!note) {
      toast.error("Note not found");
      return;
    }
    const noteTitle = getNoteTitle(content);
    if (!noteTitle) {
      toast.error("Note cannot be empty");
      return;
    }
    updateNote({
      id: note.id,
      title: noteTitle,
      content: JSON.stringify(content),
    });
  }
  function handleDeleteNote() {
    if (!note) {
      toast.error("Note not found");
      return;
    }
    deleteNote({
      noteId: note.id,
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? <SheetTrigger asChild>{trigger}</SheetTrigger> : null}
      <SheetContent className="w-full max-w-3xl">
        <div className="flex flex-col gap-4  h-full p-4">
          <SheetHeader>
            <div className="flex justify-between items-center">
              <SheetTitle className="flex items-center">
                {isNewNote ? (
                  <FaRegNoteSticky className="size-4 mr-2" />
                ) : (
                  <FaRegNoteSticky className="size-4 mr-2" />
                )}

                <span className="font-semibold">
                  {isNewNote ? "New Note" : "Edit Note"}
                </span>
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
          <div className="flex justify-start gap-2">
            <SheetClose asChild>
              <Button variant="secondary">cancel</Button>
            </SheetClose>

            <Button
              onClick={isNewNote ? handleNewNote : handleUpdateNote}
              disabled={isCreating || isUpdating || isDeleting}
            >
              {isCreating || isUpdating ? (
                <Loader className="size-4 mr-2 animate-spin" />
              ) : null}
              Save
            </Button>

            {isNewNote ? null : (
              <Button
                variant="destructive"
                className="ml-auto"
                onClick={handleDeleteNote}
                disabled={isDeleting || isCreating || isUpdating}
              >
                {isDeleting ? (
                  <Loader className="size-4 mr-2 animate-spin" />
                ) : null}
                Delete
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function getNoteTitle(content: JSONContent) {
  return content?.content?.find((element) => element.content?.[0]?.text)
    ?.content?.[0]?.text;
}
