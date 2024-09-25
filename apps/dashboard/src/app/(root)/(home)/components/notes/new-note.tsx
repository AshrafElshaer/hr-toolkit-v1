"use client";

import { Button } from "@toolkit/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import NoteSheet from "./note-sheet";

export default function NewNote() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NoteSheet isOpen={isOpen} setIsOpen={setIsOpen}>
      <Button size="xs" variant="secondary" className="ml-auto">
        <PlusIcon className="size-3 mr-2" />
        New Note
      </Button>
    </NoteSheet>
  );
}
