#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Module dependencies.
 */

import debugPkg from 'debug';
import http from 'http';
import app from '../lib/app';
import db from '../lib/models';
import seedAffiliados from '../lib/seeders/20251023-seed-afiliados';
import seedPrestadores from '../lib/seeders/20251023-seed-prestadores';

const debug = debugPkg('js/www:server');

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on the port set on the app, on all network interfaces.
 */
const port = app.get('port');
if (!port) {
  throw '¡¡Hay que setear el port de la aplicación Express!!';
}

// Run sequelize before listen
db.sequelize
  .authenticate()
  .then(async () => {
    // Ensure models are synced before starting the server
    await db.sequelize.sync();
    try {
      await seedAffiliados();
    } catch (err) {
      console.error('Error running afiliados seeder:', err);
    }
    try {
      await seedPrestadores();
    } catch (err) {
      console.error('Error running prestadores seeder:', err);
    }
    server.listen(port, () => {
      console.log(`¡Aplicación iniciada! ====> 🌎 http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });

server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
