const findWithArchived = require('./findWithArchived');

module.exports = (Model, defaultParams = {}) => (
  {
    path: '/',
    method: 'GET',
    handler: async ({ query }) => findWithArchived({ ...defaultParams, ...query }),
    config: {
      auth: 'GoogleAuthUser',
    },
  }
);
