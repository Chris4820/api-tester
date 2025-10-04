"use client"

import { linter, type Diagnostic } from "@codemirror/lint"
import { json } from "@codemirror/lang-json"
import CodeMirror from "@uiw/react-codemirror";

interface RequestBodyProps {
  body: string
  setBody: (body: string) => void
}

export function RequestBody({ body, setBody }: RequestBodyProps) {
  const jsonLinter = linter((view) => {
    try {
      JSON.parse(view.state.doc.toString());
      return [] as Diagnostic[];
    } catch (e: any) {
      return [{
        from: 0,
        to: view.state.doc.length,
        severity: "error",
        message: e.message
      }];
    }
  });

  return (
    <CodeMirror
      value={body}
      height="200px"
      extensions={[json(), jsonLinter]}
      onChange={(value: string) => setBody(value)}
    />
  );
}
