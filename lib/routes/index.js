const express = require('express');

// Import route modules (they use ES module default exports when authored
// with `export default`). When required from CommonJS we need to handle
// the `.default` wrapper that Babel may produce.
function interop(mod) {
  return mod && mod.__esModule && mod.default ? mod.default : mod;
}

let usuarios;
let afiliadoRoute;
try {
  usuarios = interop(require('./usuarios'));
} catch (e) {
  usuarios = express.Router();
}

try {
  afiliadoRoute = interop(require('./afiliadoRoute'));
} catch (e) {
  afiliadoRoute = express.Router();
}

// If there is no prestadorRoute file, export a placeholder router so
// code that mounts it doesn't receive `undefined`.
const prestadorRoute = express.Router();

module.exports = {
  usuarios,
  afiliadoRoute,
  prestadorRoute,
};
