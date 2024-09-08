import { Button } from "@v1/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
import NoteSheet from "./note-sheet";

export default function NewNote() {
  return (
    <NoteSheet>
      <Button size="xs" variant="secondary" className="ml-auto">
        <PlusIcon className="size-3 mr-2" />
        New Note
      </Button>
    </NoteSheet>
  );
}
