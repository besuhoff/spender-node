const { expect, use } = require('chai');
const sinonChai = require('sinon-chai');
const Joi = require('joi');

const authorizationHeader = require('../schemas/authorizationHeader');
const createConfiguredRoutes = require('./createConfiguredRoutes');
const failAction = require('./failAction');

use(sinonChai);

let prefix;

describe('createConfiguredRoutes', () => {
  before(() => {
    prefix = 'my-entities';
  });

  it('should be a function', () => {
    expect(createConfiguredRoutes).to.be.a('function');
  });

  it('should throw error if routes is not an array', () => {
    expect(() => createConfiguredRoutes(null, prefix)).to.throw(TypeError);
    expect(() => createConfiguredRoutes(1, prefix)).to.throw(TypeError);
    expect(() => createConfiguredRoutes({}, prefix)).to.throw(TypeError);
  });

  it('should throw error if a prefix is not a string', () => {
    expect(() => createConfiguredRoutes([], {})).to.throw(TypeError);
  });

  it('should throw error if a prefix is empty', () => {
    expect(() => createConfiguredRoutes([], '')).to.throw(TypeError);
  });

  it('should add empty list of routes', () => {
    const result = createConfiguredRoutes([], prefix);
    const expectedResult = [];

    expect(result).to.deep.equal(expectedResult);
  });

  it('should add an empty config to each route', () => {
    const routes = [{ path: '/', method: 'POST' }];

    const result = createConfiguredRoutes(routes, prefix);
    const expectedResult = [{ config: {}, ...routes[0] }];

    expect(result).to.deep.equal(expectedResult);
  });

  it('should add a Joi validation for authentication headers to routes containing auth strategy', () => {
    const routesToConfigure = [
      {
        path: '/',
        method: 'POST',
      },
      {
        path: '/',
        method: 'GET',
        config: {
          auth: 'UserAuth',
        },
      },
    ];

    const result = createConfiguredRoutes(routesToConfigure, prefix);
    // Expecting config to get added to all passed routes
    const expectedResult = [
      {
        path: '/',
        method: 'POST',
        config: {},
      },
      {
        path: '/',
        method: 'GET',
        config: {
          auth: 'UserAuth',
          validate: {
            failAction,
            headers: authorizationHeader,
          },
        },
      },
    ];

    expect(result).to.deep.equal(expectedResult);
  });

  it('should preserve existing validation when adding a Joi validation for authentication headers', () => {
    const routesToConfigure = [
      {
        path: '/',
        method: 'GET',
        config: {
          auth: 'UserAuth',
          validate: {
            headers: Joi.object({
              myCustomHeader: Joi.string().required(),
            }),
            payload: {
              From: Joi.string(),
            },
          },
        },
      },
    ];

    const result = createConfiguredRoutes(routesToConfigure, prefix);
    // Expecting config to get added to all passed routes
    const expectedResult = [
      {
        path: '/',
        method: 'GET',
        config: {
          auth: 'UserAuth',
          validate: {
            failAction,
            headers: routesToConfigure[0].config.validate.headers.concat(authorizationHeader),
            payload: {
              From: Joi.string(),
            },
          },
        },
      },
    ];

    expect(result).to.deep.equal(expectedResult);
  });

  it('should add a Joi failAction to all routes having validation', () => {
    const routesToConfigure = [
      {
        path: '/',
        method: 'POST',
      },
      {
        path: '/',
        method: 'GET',
        config: {
          auth: 'AdminAuth',
        },
      },
      {
        path: '/',
        method: 'PATCH',
        config: {
          validate: {
            payload: {},
          },
        },
      },
    ];

    const result = createConfiguredRoutes(routesToConfigure, prefix);
    // Expecting config to get added to all passed routes
    const expectedResult = [
      {
        path: '/',
        method: 'POST',
        config: {},
      },
      {
        path: '/',
        method: 'GET',
        config: {
          auth: 'AdminAuth',
          validate: {
            failAction,
            headers: authorizationHeader,
          },
        },
      },
      {
        path: '/',
        method: 'PATCH',
        config: {
          validate: {
            failAction,
            payload: {},
          },
        },
      },
    ];

    expect(result).to.deep.equal(expectedResult);
  });

  it('should preserve existing Joi failAction on the routes that already have it', () => {
    const routesToConfigure = [
      {
        path: '/',
        method: 'POST',
        config: {
          validate: {
            payload: {},
          },
        },
      },
      {
        path: '/',
        method: 'PATCH',
        config: {
          validate: {
            failAction: false,
            payload: {},
          },
        },
      },
    ];

    const result = createConfiguredRoutes(routesToConfigure, prefix);
    // Expecting config to get added to all passed routes
    const expectedResult = [
      {
        path: '/',
        method: 'POST',
        config: {
          validate: {
            failAction,
            payload: {},
          },
        },
      },
      {
        path: '/',
        method: 'PATCH',
        config: {
          validate: {
            failAction: false,
            payload: {},
          },
        },
      },
    ];

    expect(result).to.deep.equal(expectedResult);
  });
});
