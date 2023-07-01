import axios from "axios";
import * as fengari from "fengari-web";
import { useAsync } from "react-use";

/**
 * The list of Lua modules to load.
 */
const luaModules = ["/json.lua", "/dump.lua"];

/**
 * Function to create a Lua executor. This executor is able to run Lua scripts by first loading required Lua modules.
 * @async
 * @returns {Promise<Function>} A Promise that resolves to a function which can execute Lua scripts.
 */
const getLuaExecutor = async () => {
  const modules = await Promise.all(
      luaModules.map((it) => axios.get<string>(it).then((it) => it.data))
  );
  modules.forEach((luaModule) => fengari.load(luaModule)());

  return (luaCode: string) => fengari.load(luaCode)();
};

/**
 * Hook to interact with the Lua environment.
 * @returns {object} An object containing the execute function, loading state, potential error, getLuaString function and getJsonString function.
 */
export const useLuaEnv = () => {
  const { value: execute, loading, error } = useAsync(getLuaExecutor, []);

  /**
   * Function to get a Lua string representation from a JSON string.
   * @param {string} json - The JSON string.
   * @returns {string|undefined} The Lua string representation or undefined if the executor is not yet loaded.
   */
  const getLuaString = (json: string) =>
      execute?.(`return dump(json.decode('${json}'))`);

  /**
   * Function to get a JSON string from a Lua table string.
   * @param {string} luaTable - The Lua table string.
   * @returns {string|undefined} The JSON string or undefined if the executor is not yet loaded.
   */
  const getJsonString = (luaTable: string) =>
      execute?.(`return json.encode(${luaTable})`);

  return { execute, loading, error, getLuaString, getJsonString };
};
