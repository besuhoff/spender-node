const User = require('../../models/User');

module.exports = [
  {
    path: '/',
    method: 'POST',
    handler: ({ auth }) => {
      const { gapiUserId } = auth.credentials;
      const { name, email } = auth.credentials.gapiResponse;

      if (auth.credentials.user) {
        return User.query()
          .findById(auth.credentials.user.id)
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
