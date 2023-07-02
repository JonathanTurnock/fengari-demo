import React, { useEffect, useState } from "react";
import { Group } from "@mantine/core";
import { Editor } from "@monaco-editor/react";
import { config } from "../config.ts";
import { useExampleSearchParam } from "../hooks/useExampleSearchParam.ts";
import { useConverter } from "../hooks/useConverter.ts";

export const Json2LuaPage: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string | undefined>(
    config.examples[0].json
  );

  const { value, error } = useConverter(
    editorContent?.replaceAll("\r\n", "") || "",
    "json2lua"
  );

  const example = useExampleSearchParam();

  useEffect(() => {
    setEditorContent(example.json);
  }, [example]);

  return (
    <Group grow>
      <Editor
        height="90vh"
        language="json"
        value={editorContent}
        onChange={(value) => setEditorContent(value)}
        theme={"vs-dark"}
      />
      <Editor
        height="90vh"
        defaultLanguage="lua"
        options={{ readOnly: true }}
        value={value || error?.toString()}
        theme={"vs-dark"}
      />
    </Group>
  );
};
