const Joi = require('joi');

module.exports = Model => (
  {
    path: '/',
    method: 'POST',
    handler: async ({ payload, auth }) => {
      const userId = auth.credentials.user.id;

      return Model.query()
        .insertAndFetch({ ...payload, userId });
    },
    config: {
      auth: 'GoogleAuthUser',
      validate: {
        payload: Model.joiSchema || Joi.object(),
      },
    },
  }
);
