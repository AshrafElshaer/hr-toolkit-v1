"use client";
import {
  createNoteAction,
  deleteNoteAction,
  updateNoteAction,
} from "@/actions/notes";
import AdvancedEditor from "@/components/editors/advanced";
import SimpleEditor from "@/components/editors/simple-editor";
import type { Note } from "@v1/supabase/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@toolkit/ui/alert-dialog";
import { Button } from "@toolkit/ui/button";
import { ScrollArea } from "@toolkit/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@toolkit/ui/sheet";
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
  const [isTouched, setIsTouched] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
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
        setIsTouched(false);
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
        setIsTouched(false);
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
        setIsConfirmDeleteOpen(false);
        setIsTouched(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  );

  const debouncedUpdates = useDebounceCallback(async (json: JSONContent) => {
    if (!isTouched) {
      setIsTouched(true);
    }
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
    <>
      <Sheet
        open={isOpen}
        onOpenChange={(bol) =>
          !bol && isTouched ? setIsAlertOpen(true) : setIsOpen?.(bol)
        }
      >
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
                  onClick={() => setIsConfirmDeleteOpen(true)}
                  disabled={isCreating || isUpdating}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Your note is not saved. Discard all changes and close the note?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              variant="warning"
              onClick={() => {
                setIsTouched(false);
                setIsAlertOpen(false);
                setIsOpen?.(false);
              }}
            >
              Discard
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isConfirmDeleteOpen}
        onOpenChange={setIsConfirmDeleteOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              note and all of its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDeleteNote}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader className="size-4 mr-2 animate-spin" />
              ) : null}
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function getNoteTitle(content: JSONContent) {
  return content?.content?.find((element) => element.content?.[0]?.text)
    ?.content?.[0]?.text;
}
