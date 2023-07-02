function dump(o)
   if type(o) == 'table' then
      local parts = {}
      for k, v in pairs(o) do
         k = type(k) == 'number' and k or '"' .. k .. '"'
         table.insert(parts, string.format("[%s] = %s", k, dump(v)))
      end
      return "{ " .. table.concat(parts, ", ") .. " }"
   elseif type(o) == 'string' then
      return '"' .. o .. '"'
   else -- for numbers and booleans
      return tostring(o)
   end
end
