const findWithArchived = require('./findWithArchived');

module.exports = (Model, defaultParams = {}) => (
  {
    path: '/',
    method: 'GET',
    handler: ({ query }) => findWithArchived(Model, { ...defaultParams, ...query }),
    config: {
      auth: 'GoogleAuthUser',
    },
  }
);
