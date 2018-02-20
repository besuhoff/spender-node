const Joi = require('joi');

const authorizationHeader = require('../schemas/authorizationHeader');
const defaultFailAction = require('./failAction');

const createConfiguredRoutes = (routes, prefix) => {
  if (!routes || !(routes instanceof Array)) {
    throw new TypeError('Expecting an array of routes as first parameter');
  }

  if (!prefix || typeof (prefix) !== 'string') {
    throw new TypeError('Expecting a collection name (plural, e.g. categories) as a second parameter');
  }

  return routes.map((route) => {
    let { config: routeConfig } = route;

    routeConfig = routeConfig || {};

    if (routeConfig.auth) {
      if (!routeConfig.validate) {
        routeConfig.validate = {};
      }

      if (!routeConfig.validate.headers) {
        routeConfig.validate.headers = Joi.object();
      }

      routeConfig.validate.headers = routeConfig.validate.headers.concat(authorizationHeader);
    }

    if (routeConfig.validate) {
      if (routeConfig.validate.failAction === undefined) {
        routeConfig.validate.failAction = defaultFailAction;
      }
    }

    return {
      ...route,
      config: routeConfig,
    };
  });
};

module.exports = createConfiguredRoutes;
