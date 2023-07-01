import { AppShell, Group } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useLuaEnv } from "./useLuaEnv.ts";

const App = () => {
  const luaEnv = useLuaEnv();

  return (
    <AppShell>
      {luaEnv.execute && (
        <Group grow>
          <Prism title={"Hello"} language="json">
            {luaEnv.getJsonString(`{ [1] = 1,[2] = 2,[3] = 3,[4] = { ["x"] = 10 } }`)}
          </Prism>
          <Prism language="json">
            {luaEnv.getLuaString(`[1,2,3,{"x":10}]`)}
          </Prism>
        </Group>
      )}
    </AppShell>
  );
};

export default App;
