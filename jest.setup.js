const dbModule = require('./lib/models');
const db = dbModule.default || dbModule;

afterAll(() => db.sequelize.close());
