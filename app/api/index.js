const glob = require('glob');
const addRoutes = require('./addRoutes');

exports.register = (server) => {
  // Routes for each feature are loaded automatically per domain
  // E.g. "app/api/categories/index.js" should export an array of routes for "/categories/" endpoints
  // Hopefully you love magic like I do!
  // (∩｀-´)⊃━☆ﾟ.*･｡ﾟ

  glob(`${__dirname}/*/`, (err, routes) => {
    routes.forEach((route) => {
      const [, prefix] = route.match('/([^/]+)/$');

      /* eslint-disable import/no-dynamic-require, global-require */
      server.register(...addRoutes(require(route), prefix));
      /* eslint-enable global-require, import/no-dynamic-require */
    });
  });
};

exports.name = 'routes';

// For unit testing
exports.addRoutes = addRoutes;