const hapi = require('hapi');
const Knex = require('knex');
const laabr = require('laabr');
const { Model } = require('objection');
const Umzug = require('umzug');

const knexFile = require('./knexfile');
const routes = require('./app/api');
const plugins = require('./app/plugins');
const { version: API_VERSION } = require('./package.json');
const { port, host } = require('./app/config/env');

const main = async function () {
  try {
    // Create Server
    const server = hapi.server({
      routes: {
        cors: {
          origin: ['*'],
          headers: ['content-type', 'x-auth-token'],
        },
      },
      host,
      port,
    });

    // Initialize knex connection.
    const knex = Knex(knexFile);

    // Give the connection to objection.
    Model.knex(knex);

    // Migrate to latest db
    const umzug = new Umzug({
      storage: 'knex-migrate/lib/storage',
      storageOptions: { connection: knex },
      migrations: {
        params: [knex, Promise],
        path: './migrations',
        pattern: /^\d+(\w|[-_])+\.js$/,
      },
    });

    await server.register(routes);

    // Default Routes
    server.route({
      method: 'GET',
      path: '/',
      handler: () => API_VERSION,
    });

    plugins.push({
      plugin: laabr,
      options: {
        formats: {
          log: ':time[iso] :level :message',
        },
      },
    });

    await server.register(plugins);

    server.log('info', 'Migrating DB...');
    await umzug.storage.ensureTable();
    const migrations = await umzug.up({});

    if (migrations.length) {
      server.log('info', 'Migrations applied:');
      server.log('info', migrations.map(mig => mig.file).join('\n'));
    } else {
      server.log('info', 'Nothing to migrate');
    }

    await server.start();
  } catch (error) {
    console.log('error', error);
    process.exit(1);
  }
};

main();
