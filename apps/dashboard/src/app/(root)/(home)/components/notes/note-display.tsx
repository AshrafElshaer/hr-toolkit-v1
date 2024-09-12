"use client";

import type { Note } from "@v1/supabase/types";
import moment from "moment";
import React, { useState } from "react";
import NoteSheet from "./note-sheet";

type Props = {
  note: Note;
};

export default function NoteDisplay({ note }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NoteSheet isOpen={isOpen} setIsOpen={setIsOpen} note={note}>
      <div className="p-2 w-full hover:bg-accent cursor-pointer flex justify-between gap-2">
        <p className="font-semibold truncate">{note.title}</p>
        <p className="text-sm text-secondary-foreground min-w-fit">
          {moment(note.createdAt).format("D MMM, YY")}
        </p>
      </div>
    </NoteSheet>
  );
}
