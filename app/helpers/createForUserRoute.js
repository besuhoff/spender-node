const Joi = require('joi');

module.exports = Model => (
  {
    path: '/',
    method: 'POST',
    handler: async ({ params, auth }) => Model.query().insert({ userId: auth.credentials.user.id, ...params }),
    config: {
      auth: 'GoogleAuthUser',
    },
    validate: {
      payload: Model.joiSchema || Joi.object(),
    },
  }
);
