const Joi = require('joi');

module.exports = Joi.object({
  'http-x-auth-token': Joi.string().required(),
});
