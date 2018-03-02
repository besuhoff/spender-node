const convertToSnakeCase = function convertToSnakeCase(value) {
  if (value === '*') {
    return value;
  }

  const matched = value.match(/(.*?)(\[[0-9]\])/);

  if (matched) {
    return convertToSnakeCase(matched[1]) + matched[2];
  }

  return `${value.replace(/([A-Z])/g, (_, s) => `_${s.toLowerCase()}`)}`;
};

const convertToCamelCase = function convertToCamelCase(map) {
  const result = {};

  Object.keys(map).forEach((key) => {
    const camelCaseKey = `${key.replace(/_([a-z])/g, (_, s) => `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`)}`;

    result[camelCaseKey] = map[key];
  });

  return result;
};

module.exports = {
  client: 'mysql',
  wrapIdentifier: (value, decorated) => decorated(convertToSnakeCase(value)),
  postProcessResponse: result => ((Array.isArray(result)) ?
    result.map(row => convertToCamelCase(row)) : convertToCamelCase(result)),
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
