"use client";
import { useCurrentEditor } from "@tiptap/react";
import { Button } from "@v1/ui/button";
import { cn } from "@v1/ui/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { ChevronDown, LetterText, Pilcrow } from "lucide-react";
import { type EditorInstance, useEditor } from "novel";
import React from "react";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
} from "react-icons/lu";
import ToolbarButton from "./toolbar-button";

const options = [
  {
    label: "Heading 1",
    value: "h1",
    size: "30 px",
    icon: <LuHeading1 />,
    command: (editor: EditorInstance) =>
      editor?.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    label: "Heading 2",
    value: "h2",
    size: "24 px",
    icon: <LuHeading2 />,
    command: (editor: EditorInstance) =>
      editor?.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: "Heading 3",
    value: "h3",
    size: "18 px",
    icon: <LuHeading3 />,
    command: (editor: EditorInstance) =>
      editor?.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    label: "Heading 4",
    value: "h4",
    size: "16 px",
    icon: <LuHeading4 />,
    command: (editor: EditorInstance) =>
      editor?.chain().focus().toggleHeading({ level: 4 }).run(),
  },
  {
    label: "Heading 5",
    value: "h5",
    size: "16 px",
    icon: <LuHeading5 />,
    command: (editor: EditorInstance) =>
      editor?.chain().focus().toggleHeading({ level: 5 }).run(),
  },
  {
    label: "Paragraph",
    value: "p",
    size: "16 px",
    icon: <Pilcrow className="size-3" />,
    command: (editor: EditorInstance) =>
      editor?.chain().focus().setParagraph().run(),
  },
];
export default function TextSize({ editor }: { editor: EditorInstance }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ToolbarButton
          isActive={editor?.isActive("heading")}
          tooltip="Text styles"
          aria-label="Text styles"
          pressed={editor?.isActive("heading")}
          disabled={editor?.isActive("codeBlock")}
          size={"sm"}
          variant={"outline"}
          className="flex items-center gap-2 w-14"
        >
          <LetterText className="size-4" />
          <ChevronDown className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => option.command(editor)}
            className={cn("flex items-center gap-2", {
              "bg-accent": editor?.isActive("heading", {
                level: Number.parseInt(option.value.slice(1)),
              }),
            })}
          >
            {option.icon}
            {option.label}
            <span className="text-muted-foreground text-sm ml-auto">
              {option.size}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
