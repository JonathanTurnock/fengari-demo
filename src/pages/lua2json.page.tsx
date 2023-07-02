import React, { useEffect, useState } from "react";
import { Group } from "@mantine/core";
import { Editor } from "@monaco-editor/react";
import { config } from "../config.ts";
import { useExampleSearchParam } from "../hooks/useExampleSearchParam.ts";
import { useConverter } from "../hooks/useConverter.ts";

export const Lua2JsonPage: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string | undefined>(
    config.examples[0].json
  );
  const { value, error } = useConverter(editorContent || "", "lua2json");

  const example = useExampleSearchParam();

  useEffect(() => {
    setEditorContent(example.lua);
  }, [example]);

  return (
    <Group grow>
      <Editor
        height="90vh"
        language="lua"
        value={editorContent}
        onChange={(value) => setEditorContent(value)}
        theme={"vs-dark"}
      />
      <Editor
        height="90vh"
        defaultLanguage="json"
        options={{ readOnly: true }}
        value={value || error?.toString()}
        theme={"vs-dark"}
      />
    </Group>
  );
};
