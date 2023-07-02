--- Recursively generates a string representation of a Lua table.
-- Handles tables with nested tables and prevents infinite recursion.
-- The output is in a JSON-like format with commas.
-- @param o The table to be dumped.
-- @param seen An optional table keeping track of already visited tables to prevent infinite recursion.
-- @param depth An optional parameter indicating current depth level for correct indentation.
-- @return string A string representation of the table.
function dump(o, seen, depth)
   seen = seen or {}
   depth = depth or 0
   if type(o) == 'table' then
      if seen[o] then
         return "recursion"
      end
      seen[o] = true
      local parts = {}
      local count = 0
      for k, v in pairs(o) do
         count = count + 1
      end
      local i = 0
      for k, v in pairs(o) do
         i = i + 1
         local name = type(k) == 'number' and k or '"' .. k:gsub('"', '\\"') .. '"'
         if i == count then
            table.insert(parts, string.rep(" ", depth + 2) .. string.format("[%s] = %s", name, dump(v, seen, depth + 2, name), name))
         else
            table.insert(parts, string.rep(" ", depth + 2) .. string.format("[%s] = %s,", name, dump(v, seen, depth + 2, name), name))
         end
      end
      return "{\n" .. table.concat(parts, "\n") .. "\n" .. string.rep(" ", depth) .. "}"
   elseif type(o) == 'string' then
      return '"' .. o:gsub('"', '\\"'):gsub('\n', '\\n') .. '"'
   else -- for numbers and booleans
      return tostring(o)
   end
end
