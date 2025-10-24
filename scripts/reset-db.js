// Script to reset DB: drop and recreate tables and seed data
const fs = require('fs');
const path = require('path');

function tryRequire(p) {
  try {
    return require(p);
  } catch (e) {
    return null;
  }
}

// Prefer transpiled files in dist (CommonJS). Fall back to lib when necessary.
const distModelsPath = path.join(
  __dirname,
  '..',
  'dist',
  'lib',
  'models',
  'index.js'
);
const distSeederPath = path.join(
  __dirname,
  '..',
  'dist',
  'lib',
  'seeders',
  '20251023-seed-afiliados.js'
);

let dbModule = null;
let seedModule = null;
if (fs.existsSync(distModelsPath)) {
  console.log('Trying dist models path:', distModelsPath);
  dbModule = tryRequire(distModelsPath);
}
if (!dbModule) {
  console.log('Falling back to lib models');
  dbModule =
    tryRequire('../lib/models') || tryRequire('../lib/models/index.js');
}

if (fs.existsSync(distSeederPath)) {
  console.log('Trying dist seeder path:', distSeederPath);
  seedModule = tryRequire(distSeederPath);
}
if (!seedModule) {
  console.log('Falling back to lib seeder');
  seedModule =
    tryRequire('../lib/seeders/20251023-seed-afiliados') ||
    tryRequire('../lib/seeders/20251023-seed-afiliados.js');
}

const db = (dbModule && (dbModule.default || dbModule)) || null;
const seed = (seedModule && (seedModule.default || seedModule)) || null;

async function reset() {
  try {
    console.log('Loaded db module:', !!dbModule);
    console.log('Loaded seed module:', !!seedModule);
    if (!db) throw new Error('Could not load db module');
    await db.sequelize.sync({ force: true });
    console.log('Database synced (force: true)');
    if (seed) {
      await seed();
      console.log('Seeded data');
    } else {
      console.warn('Seeder module not found; skipping seed');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error resetting DB', err);
    process.exit(1);
  }
}

reset();
