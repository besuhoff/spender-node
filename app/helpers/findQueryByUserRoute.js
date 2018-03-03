const findWithArchived = require('./findWithArchived');

module.exports = (Model, defaultParams = {}) => (
  {
    path: '/',
    method: 'GET',
    handler: async ({ query, auth }) => (
      findWithArchived({ ...defaultParams, userId: auth.credentials.user.id, ...query })
    ),
    config: {
      auth: 'GoogleAuthUser',
    },
  }
);
