import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import React, { useEffect, useRef } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const theme = EditorView.baseTheme({
  "&": {
    fontSize: "16px",
    height: "100%"
  },
  ".cm-scroller": {
    overflow: "auto",
    height: "100%"
  },
  "&.cm-focused": {
    outline: "none",
  },
});

export const MarkdownEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const editor = useRef<EditorView>();

  useEffect(() => {
    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        markdown(),
        theme,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: document.querySelector("#editor-container")!,
    });

    editor.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  return <div id="editor-container" className="h-full w-full" />;
}; 