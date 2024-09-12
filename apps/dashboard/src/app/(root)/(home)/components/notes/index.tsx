import { getUserNotesAction } from "@/actions/notes";
import { Button } from "@v1/ui/button";
import { Card, CardContent } from "@v1/ui/card";
import { Separator } from "@v1/ui/separator";
import { NotebookPen, PlusIcon } from "lucide-react";
import React from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import NewNote from "./new-note";
// import SingleNote from "./single-note";
// import { ScrollArea } from "@hr-toolkit/ui/scroll-area";
// import type { NoteSelect } from "@hr-toolkit/supabase/types";
// import NoteDialog from "./note-dialog";

// type Props = {
// 	notes: NoteSelect[];
// };
export default async function Notes() {
  const notesAction = await getUserNotesAction();
  const notes = notesAction?.data;
  console.log("notes", notes);
  return (
    <Card className="w-full  min-h-[300px] max-h-[350px] md:max-h-fit flex flex-col  p-0  overflow-hidden">
      <div className="flex gap-2 items-center p-2">
        <FaRegNoteSticky className="size-4" />
        <span className="font-semibold">Notes</span>
        <NewNote />
      </div>

      <Separator className="w-full " />
      <CardContent className="p-0  flex-grow overflow-scroll scrollbar-hide">
        {!notes || notes.length === 0 ? (
          <NotesEmptyState />
        ) : (
          notes.map((note) => <div key={note.id}>{note.title}</div>)
        )}
      </CardContent>
    </Card>
  );
}

function NotesEmptyState() {
  return (
    <div className="relative p-2 text-center h-64 flex flex-col justify-center items-center text-muted-foreground tex-sm ">
      <NotebookPen size={75} />
      <p className="mt-4">No notes found!</p>
      <p>Add a new note to get started.</p>
      <svg
        className="fill-current absolute top-3 right-7 size-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
      >
        <title>new note arrow</title>
        <path d="M205.66,85.66a8,8,0,0,1-11.32,0L160,51.31V128A104.11,104.11,0,0,1,56,232a8,8,0,0,1,0-16,88.1,88.1,0,0,0,88-88V51.31L109.66,85.66A8,8,0,0,1,98.34,74.34l48-48a8,8,0,0,1,11.32,0l48,48A8,8,0,0,1,205.66,85.66Z" />
      </svg>
    </div>
  );
}
