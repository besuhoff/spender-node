const Client = require('knex/lib/dialects/mysql');

Client.prototype.wrapIdentifier = (value) => {
  if (value === '*') {
    return value;
  }

  const matched = value.match(/(.*?)(\[[0-9]\])/);

  if (matched) {
    return Client.prototype.wrapIdentifier.wrapIdentifier(matched[1]) + matched[2];
  }

  return `${value.replace(/([A-Z])/g, (_, s) => `_${s.toLowerCase()}`)}`;
};

module.exports = {
  client: Client,
  useNullAsDefault: true,
  connection: {
    user: 'spender',
    password: 'spender',
    database: 'spender',
  },
  migrations: {
    tableName: 'migrations',
  },
};
