import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { all, createLowlight } from "lowlight";
import {
  // CodeBlockLowlight,
  HorizontalRule,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TiptapImage,
  TiptapLink,
  TiptapUnderline,
  UpdatedImage,
} from "novel/extensions";

import { cx } from "class-variance-authority";

// TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects

// You can overwrite the placeholder with your own configuration
const placeholder = Placeholder.configure({
  placeholder: ({ editor, node, pos, hasAnchor }) => {
    if (node.type.name === "heading" && pos === 0) {
      return "Untitled Note";
    }

    if (node.type.name === "heading" && pos !== 0) {
      return "What’s the title?";
    }

    if (editor?.isEmpty) {
      return "What are you thinking about ?";
    }
    return "Start typing...";
  },
});
const textStyle = TextStyle.configure({
  HTMLAttributes: {
    class: cx("text-foreground"),
  },
});

const textAlign = TextAlign.configure({
  types: ["heading", "paragraph", "blockquote", "code"],
});

const tiptapUnderline = TiptapUnderline.configure({
  HTMLAttributes: {
    class: cx("underline underline-offset-[3px]"),
  },
});

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      "text-current underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
    ),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2 my-4"),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex items-start gap-2 mb-2 last:mb-0"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc  leading-3 !pl-6 "),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal  leading-3 !pl-6 "),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal "),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 pl-3 my-4 border-muted-foreground"),
    },
  },

  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  p-2 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
  codeBlock: false,
});
const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted my-6"),
  },
});

const codeBlockLowlight = CodeBlockLowlight.configure({
  lowlight: createLowlight(all),
  HTMLAttributes: {
    class: cx("rounded-sm bg-muted border p-5 mb-4 font-mono font-medium"),
  },
  languageClassPrefix: "language-",
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  TiptapLink,
  TiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  tiptapLink,
  codeBlockLowlight,
  textStyle,
  textAlign,
  tiptapUnderline,
];
