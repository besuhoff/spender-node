const findQuery = require('objection-find');

module.exports = Model => (
  {
    path: '/',
    method: 'GET',
    handler: async ({ query, auth }) => {
      const params = { userId: auth.credentials.user.id, ...query };

      return findQuery(Model).build(params);
    },
    config: {
      auth: 'GoogleAuthUser',
    },
  }
);
