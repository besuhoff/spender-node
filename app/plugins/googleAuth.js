const Boom = require('boom');
const fetch = require('node-fetch');
const User = require('../models/User');

const GAPI_CLIENT_ID = '843225840486-ilkj47kggue9tvh6ajfvvog45mertgfg.apps.googleusercontent.com';

class GoogleAuthStrategy {
  async validate(token) {
    const credentials = {};
    let isValid = false;

    if (!token) {
      return { isValid, credentials };
    }

    const gapiResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
      .then(res => res.json());

    if (gapiResponse.aud === GAPI_CLIENT_ID) {
      isValid = true;

      credentials.gapiUserId = gapiResponse.sub;

      credentials.gapiResponse = gapiResponse;

      credentials.user = await User.query()
        .where({ gapiUserId: credentials.gapiUserId })
        .first();
    }

    return { isValid, credentials };
  }
}

class GoogleAuthUserStrategy extends GoogleAuthStrategy {
  async validate(token) {
    const { isValid, credentials } = await super.validate(token);

    return { isValid: isValid && !!credentials.user, credentials };
  }
}


module.exports.register = async (server) => {
  server.auth.scheme('google-oauth-token', (s, options) => (
    {
      authenticate: async (request, h) => {
        const token = request.raw.req.headers['x-auth-token'];

        const { isValid, credentials } = await options.validate(token);

        if (isValid) {
          return h.authenticated({ credentials });
        }

        return h.unauthenticated(Boom.unauthorized(), { credentials });
      },
    }
  ));

  server.auth.strategy('GoogleAuth', 'google-oauth-token', new GoogleAuthStrategy());
  server.auth.strategy('GoogleAuthUser', 'google-oauth-token', new GoogleAuthUserStrategy());
};

module.exports.name = 'googleAuth';
