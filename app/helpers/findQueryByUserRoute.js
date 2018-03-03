const findWithArchived = require('./findWithArchived');

module.exports = (Model, defaultParams = {}) => (
  {
    path: '/',
    method: 'GET',
    handler: ({ query, auth }) => (
      findWithArchived(Model, { ...defaultParams, userId: auth.credentials.user.id, ...query })
    ),
    config: {
      auth: 'GoogleAuthUser',
    },
  }
);
