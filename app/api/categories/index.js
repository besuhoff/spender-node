const findQuery = require('objection-find');
const Category = require('../../models/Category');

module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: async request => findQuery(Category).build(request.params),
    config: {
      auth: 'GoogleAuthUser',
    },
  },
];
