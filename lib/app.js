const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const routes = require('./routes');
const express = require('express');
const { afiliadoRoute } = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
// Make the port available to the bin/www entrypoint via app.get('port')
app.set('port', PORT);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(compression());

app.use('/prestadores', routes.prestadorRoute);
app.use('/afiliados', afiliadoRoute);

// Export app without calling `listen` here. The bin/www entrypoint is
// responsible for starting the HTTP server. This avoids attempting to
// listen twice when `lib/app` is required from `bin/www`.
module.exports = app;
