export const config = {
  encoders: [
    {
      label: "No Array",
      value: "no-array",
      path: "/json2.lua",
    },
  ],
  examples: [
    {
      label: "Hello World Table",
      value: "hello-world",
      json: '{"hello":"world"}',
      lua: '{ ["hello"] = "world" }',
    },
    {
      label: "Array",
      value: "arrays",
      json: '["world"]',
      lua: '{ [1] = "world" }',
    },
    {
      label: "Callsign (mixed keys)",
      value: "callsign",
      json: '{"_1":1,"_2":1,"name":"Enfield11","_3":1}',
      lua: '{ [1] = 1, [2] = 1, ["name"] = "Enfield11", [3] = 1 }',
    },
  ],
};
