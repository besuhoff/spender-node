const googleAuth = require('./googleAuth');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const { version } = require('../../package');


module.exports = [
  googleAuth,
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'Spender API',
        version,
      },
    },
  },
];