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
    height: "100%",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "4px"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
  },
  ".cm-content": {
    minHeight: "100%",
    padding: "10px"
  },
  "&.cm-focused": {
    outline: "none"
  },
  ".cm-line": {
    padding: "0 4px",
    lineHeight: "1.6"
  }
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
        EditorView.lineWrapping,
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

  return (
    <div 
      id="editor-container" 
      className="h-full w-full overflow-hidden"
    />
  );
}; 