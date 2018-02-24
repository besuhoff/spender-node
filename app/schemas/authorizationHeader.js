const Joi = require('joi');

module.exports = Joi.object({
  'x-auth-token': Joi.string().required(),
});
