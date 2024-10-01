"use client";

import { useEditor } from "@tiptap/react";
import { Button } from "@toolkit/ui/button";
import { ScrollArea } from "@toolkit/ui/scroll-area";
import {
  EditorBubble,
  EditorBubbleItem,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { defaultExtensions } from "../extensions";
import SimpleEditorToolbar from "./toolbar";
// import { all, createLowlight } from 'lowlight'

export default function SimpleEditor() {
  const [content, setContent] = useState<JSONContent | undefined>({
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 2,
        },
      },
    ],
  });

  const editor = useEditor({
    content,
    extensions: defaultExtensions,
    onUpdate({ editor }) {
      debouncedUpdates(editor);
    },
  });

  const debouncedUpdates = useDebounceCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      setContent(json);
    },
    500,
  );

  if (!editor) return null;
  return (
    <EditorRoot>
      <SimpleEditorToolbar editor={editor} />
      <ScrollArea className="flex-1 p-4 border mt-1 rounded-md">
        <EditorContent>
          <EditorBubble
            tippyOptions={{
              placement: "top",
            }}
            className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
          >
            <EditorBubbleItem>
              <span>Hello</span>
            </EditorBubbleItem>
            {/* <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />

          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} /> */}
          </EditorBubble>
        </EditorContent>
      </ScrollArea>
      <Button
        variant="outline"
      
      >
        Save
      </Button>
    </EditorRoot>
  );
}
