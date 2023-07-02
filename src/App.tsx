import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Navbar,
  NavLink,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Json2LuaPage } from "./pages/json2lua.page.tsx";
import { Lua2JsonPage } from "./pages/lua2json.page.tsx";
import { config } from "./config.ts";
import React from "react";
import { useNavigateWithSearchParams } from "./hooks/useNavigateWithSearchParams.ts";
import { AiFillGithub } from "react-icons/ai";

const AppHeader: React.FC = () => {
  const height = 60;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleExampleChange = (example: string) => {
    searchParams.set("example", example);
    setSearchParams(searchParams);
  };

  return (
    <Header height={height} pl={"md"} pr={"md"}>
      <Stack h={height} justify="center" c={"white"}>
        <Group position="apart">
          <Group position="left" spacing={"xl"}>
            <Title order={3}>JSON ↔ LUA</Title>

            <Group spacing={"xs"}>
              <Text>Example:</Text>
              <Select
                size={"xs"}
                data={config.examples}
                value={searchParams.get("example") || config.examples[0].value}
                onChange={handleExampleChange}
              />
            </Group>
          </Group>
          <Group>
            <Tooltip label="Source Code">
              <ActionIcon
                variant={"default"}
                size={"lg"}
                onClick={() =>
                  window.open("https://github.com/JonathanTurnock/json-lua")
                }
              >
                <AiFillGithub size="1.5rem" />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Stack>
    </Header>
  );
};

const AppNavbar = () => {
  const nav = useNavigateWithSearchParams();
  const path = useLocation();

  const links = [
    { value: "json-2-lua", label: "JSON → LUA" },
    { value: "lua-2-json", label: "LUA → JSON" },
  ].map(({ value, label }) => (
    <NavLink
      key={value}
      active={path.pathname.endsWith(value)}
      onClick={() => nav(value)}
      label={label}
    />
  ));

  return (
    <Navbar width={{ base: 200 }} p={0} styles={{ root: { zIndex: 0 } }}>
      <Stack spacing={0}>{links}</Stack>
    </Navbar>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AppShell header={<AppHeader />} navbar={<AppNavbar />}>
        <Routes>
          <Route path="/json-2-lua" element={<Json2LuaPage />} />
          <Route path="/lua-2-json" element={<Lua2JsonPage />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
};

export default App;
