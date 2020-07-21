const prependFile = require("prepend-file");
const path = require("path");

prependFile(
  path.resolve(__dirname, "../build/bin/clivate.js"),
  `#!/usr/bin/env node
`
);
