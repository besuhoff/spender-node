const Joi = require('joi');
const User = require('../../models/User');

module.exports = [
  {
    path: '/',
    method: 'PUT',
    handler: ({ auth }) => {
      const { gapiUserId } = auth.credentials;
      const { name, email } = auth.credentials.gapiResponse;

      if (auth.credentials.user) {
        return User.query()
          .patchAndFetchById(auth.credentials.user.id, { name, email });
      }

      return User.query()
        .insert({
          name,
          email,
          gapiUserId,
          wizardStep: 1,
        });
    },
    config: {
      auth: 'GoogleAuth',
    },
  },
  {
    path: '/',
    method: 'PATCH',
    handler: ({ auth, payload }) => User.query().patchAndFetchById(auth.credentials.user.id, payload),
    config: {
      auth: 'GoogleAuthUser',
      validate: {
        payload: {
          wizardStep: Joi.number().integer(),
        },
      },
    },
  },
];
