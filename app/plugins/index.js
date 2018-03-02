const googleAuth = require('./googleAuth');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const Laabr = require('laabr');
const { version } = require('../../package');
const { host } = require('../config/env');


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
      host
    },
  },
  {
    plugin: Laabr,
    options: {
      formats: {
        log: ':time[iso] :level :message',
      },
    },
  }
];