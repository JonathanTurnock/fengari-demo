import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { config } from "../config.ts";

export const useExampleSearchParam = () => {
  const [searchParams] = useSearchParams();

  const [example, setExample] = useState<(typeof config.examples)[0]>(
    config.examples[0]
  );

  useEffect(() => {
    const exampleValue = searchParams.get("example");
    const e = config.examples.find((it) => it.value === exampleValue);
    if (e) {
      setExample(e);
    }
  }, [searchParams]);

  return example;
};
