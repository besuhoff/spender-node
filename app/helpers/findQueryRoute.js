const findQuery = require('objection-find');

module.exports = Model => (
  {
    path: '/',
    method: 'GET',
    handler: async ({ query }) => findQuery(Model).build(query),
    config: {
      auth: 'GoogleAuthUser',
    },
  }
);
