import type { Range } from "@tiptap/core";
import { Button } from "@v1/ui/button";
import { Separator } from "@v1/ui/separator";
import { TooltipProvider } from "@v1/ui/tooltip";
import type { EditorInstance } from "novel";
import {
  FaBold,
  FaCode,
  FaImage,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaMinus,
  FaQuoteLeft,
  FaStrikethrough,
  FaTasks,
} from "react-icons/fa";
import { GrBlockQuote } from "react-icons/gr";
import TextSize from "./text-size";
import ToolbarButton from "./toolbar-button";
import { RiDoubleQuotesR } from "react-icons/ri";

const toolbarItems = [
  {
    label: "Bold",
    icon: <FaBold />,
    value: "bold",
    command: (editor: EditorInstance) =>
      editor?.chain().focus().toggleBold().run(),
  },
  {
    label: "Italic",
    icon: <FaItalic />,
    value: "italic",
    command: (editor: EditorInstance) =>
      editor?.chain().focus().toggleItalic().run(),
  },
  {
    label: "Strike",
    icon: <FaStrikethrough />,
    value: "strike",
    command: (editor: EditorInstance) =>
      editor?.chain().focus().toggleStrike().run(),
  },
  {
    label: "Code",
    icon: <FaCode />,
    value: "code",
    command: (editor: EditorInstance) =>
      editor?.chain().focus().toggleCode().run(),
  },
  {
    label: "Separator-1",
    icon: <Separator orientation="vertical" className="h-4/5 mx-1" />,
    value: "separator",
    command: (editor: EditorInstance) => {},
  },
  {
    label: "Unordered List",
    icon: <FaListUl />,
    value: "bulletList",
    command: (editor: EditorInstance) => {
      editor.chain().focus().toggleBulletList().run();
    },
  },
  {
    label: "Ordered List",
    icon: <FaListOl />,
    value: "orderedList",
    command: (editor: EditorInstance) => {
      editor.chain().focus().toggleOrderedList().run();
    },
  },
  {
    label: "Task List",
    icon: <FaTasks />,
    value: "taskList",
    command: (editor: EditorInstance) => {
      editor.chain().focus().toggleTaskList().run();
    },
  },
  {
    label: "Separator-2",
    icon: <Separator orientation="vertical" className="h-4/5 mx-1" />,
    value: "separator",
    command: (editor: EditorInstance) => {},
  },
  {
    label: "Blockquote",
    icon: <RiDoubleQuotesR />,
    value: "blockquote",
    command: (editor: EditorInstance) => {
      editor.chain().focus().toggleBlockquote().run();
    },
  },

  {
    label: "Divider",
    icon: <FaMinus />,
    value: "divider",
    command: (editor: EditorInstance) => {
      editor.chain().focus().setHorizontalRule().run();
    },
  },
  {
    label: "Separator-3",
    icon: <Separator orientation="vertical" className="h-4/5 mx-1" />,
    value: "separator",
    command: (editor: EditorInstance) => {},
  },
  {
    label: "Link",
    icon: <FaLink />,
    value: "link",
    command: (editor: EditorInstance) => {
      // editor.chain().focus().toggleLink().run();
    },
  },
  {
    label: "Image",
    icon: <FaImage />,
    value: "image",
    command: (editor: EditorInstance) => {
      // editor.chain().focus().toggleImage().run();
    },
  },
];

export default function SimpleEditorToolbar({
  editor,
}: { editor: EditorInstance }) {
  return (
    <TooltipProvider delayDuration={0}>
      <section className="flex items-center gap-1 ">
        <TextSize editor={editor} />
        <Separator orientation="vertical" className="h-4/5 mx-1" />
        {toolbarItems.map((item) =>
          item.value === "separator" ? (
            <Separator
              orientation="vertical"
              className="h-4/5 mx-1"
              key={item.label}
            />
          ) : (
            <ToolbarButton
              key={item.label}
              isActive={editor?.isActive(item.value)}
              tooltip={item.label}
              aria-label={item.label}
              pressed={editor?.isActive(item.value)}
              disabled={editor?.isActive("codeBlock")}
              size={"sm"}
              variant={"outline"}
              className="w-8"
              onClick={() => item.command(editor)}
            >
              {item.icon}
            </ToolbarButton>
          ),
        )}
      </section>
    </TooltipProvider>
  );
}
