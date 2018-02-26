const User = require('../../models/User');

module.exports = [
  {
    path: '/',
    method: 'POST',
    handler: (request) => {
      const { gapiUserId } = request.auth.credentials;
      const { name, email } = request.auth.credentials.gapiResponse;

      if (request.auth.credentials.user) {
        return User.query()
          .findById(request.auth.credentials.user.id)
          .update({ name, email });
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
];
