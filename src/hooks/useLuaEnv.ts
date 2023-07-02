import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fengari from "fengari-web";
import { useAsync } from "react-use";

let executor: (luaCode: string, onError?: (e: Error) => void) => string;

/**
 * The list of Lua modules to load.
 */
const luaModules = ["/json2.lua", "/dump.lua"];

/**
 * Function to create a Lua executor. This executor is able to run Lua scripts by first loading required Lua modules.
 * @async
 * @returns {Promise<Function>} A Promise that resolves to a function which can execute Lua scripts.
 */
const getLuaExecutor = async () => {
  if (executor) return executor;

  const modules = await Promise.all(
    luaModules.map((it) => axios.get<string>(it).then((it) => it.data))
  );
  modules.forEach((luaModule) => fengari.load(luaModule)());

  executor = (luaCode: string, onError?: (e: Error) => void) => {
    try {
      return fengari.load(luaCode)();
    } catch (e) {
      console.error(e);
      onError?.(e as Error);
    }
  };

  return executor;
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
   * @param onError - Callback invoked on any errors
   * @returns {string|undefined} The Lua string representation or undefined if the executor is not yet loaded.
   */
  const getLuaString = (json: string, onError?: (e: Error) => void) =>
    execute?.(`return dump(json.decode('${json}'))`, onError);

  /**
   * Function to get a JSON string from a Lua table string.
   * @param {string} luaTable - The Lua table string.
   * @param onError - Callback invoked on any errors
   * @returns {string|undefined} The JSON string or undefined if the executor is not yet loaded.
   */
  const getJsonString = (luaTable: string, onError?: (e: Error) => void) =>
    execute?.(`return json.encode(${luaTable})`, onError);

  return { execute, loading, error, getLuaString, getJsonString };
};
