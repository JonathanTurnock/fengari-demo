function dump(o, seen, depth)
   seen = seen or {}
   depth = depth or 0
   if type(o) == 'table' then
      if seen[o] then
         return "recursion"
      end
      seen[o] = true
      local parts = {}
      for k, v in pairs(o) do
         local name = type(k) == 'number' and k or '"' .. k:gsub('"', '\\"') .. '"'
         table.insert(parts, string.rep(" ", depth + 2) .. string.format("[%s] = %s", name, dump(v, seen, depth + 2, name), name))
      end
      return "{\n" .. table.concat(parts, "\n") .. "\n" .. string.rep(" ", depth) .. "}"
   elseif type(o) == 'string' then
      return '"' .. o:gsub('"', '\\"'):gsub('\n', '\\n') .. '"'
   else -- for numbers and booleans
      return tostring(o)
   end
end
