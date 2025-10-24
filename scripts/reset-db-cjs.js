// CommonJS reset script that requires transpiled dist modules by absolute path
const path = require('path');

const dbPath = path.resolve(
  __dirname,
  '..',
  'dist',
  'lib',
  'models',
  'index.js'
);
const fs = require('fs');

let dbModule;
try {
  dbModule = require(dbPath);
} catch (e) {
  console.error('Failed to require dist db module at', dbPath, e.message);
  process.exit(1);
}

const db = dbModule.default || dbModule;

const seedersDir = path.resolve(__dirname, '..', 'dist', 'lib', 'seeders');

(async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log('Database synced (force: true) via CJS script');

    // Load and run all seeders in dist/lib/seeders
    let files = [];
    try {
      files = fs.readdirSync(seedersDir).filter((f) => f.endsWith('.js'));
    } catch (e) {
      console.warn('No seeders directory found at', seedersDir, e.message);
    }

    for (const file of files) {
      const full = path.join(seedersDir, file);
      try {
        const mod = require(full);
        const fn = mod.default || mod;
        if (typeof fn === 'function') {
          await fn();
          console.log('Ran seeder:', file);
        } else {
          console.warn('Seeder export not a function:', file);
        }
      } catch (e) {
        console.error('Error running seeder', file, e.message);
      }
    }

    console.log('All seeders processed');
    process.exit(0);
  } catch (err) {
    console.error('Error in reset CJS script', err);
    process.exit(1);
  }
})();
