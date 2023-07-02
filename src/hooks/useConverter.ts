import { useEffect, useState } from "react";
import { useLuaEnv } from "./useLuaEnv.ts";

export const useConverter = (
  editorContent: string,
  direction: "lua2json" | "json2lua"
) => {
  const luaEnv = useLuaEnv();
  const [value, setValue] = useState<string | undefined>();
  const [error, setError] = useState<Error | undefined>();
  useEffect(() => {
    if (!editorContent) return;
    setValue(undefined);
    if (direction === "json2lua") {
      setValue(luaEnv?.getLuaString(editorContent, setError));
    } else {
      setValue(luaEnv?.getJsonString(editorContent, setError));
    }
  }, [editorContent, luaEnv]);

  return { value, error };
};
