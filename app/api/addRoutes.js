const createConfiguredRoutes = require('./createConfiguredRoutes');

const addRoutes = function (routes, prefix) {
  const configuredRoutes = createConfiguredRoutes(routes, prefix);
  const register = server => server.route(configuredRoutes);

  return [
    {
      register,
      name: `routes_${prefix}`,
    },
    {
      routes: {
        prefix: `/${prefix}`,
      },
    },
  ];
};

module.exports = addRoutes;
