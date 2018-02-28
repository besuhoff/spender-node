const { Model } = require('objection');
const Joi = require('joi');

class Currency extends Model {
  static get tableName() {
    return 'currency';
  }

  static get joiSchema() {
    return Joi.object({
      symbol: Joi.string().max(12).required(),
      symbolNative: Joi.string().max(12).required(),
      decimalDigits: Joi.number().integer().required(),
      rounding: Joi.number().integer().required(),
      code: Joi.string().max(12).required(),

      id: Joi.number().positive().allow(null),
      createdAt: Joi.date().allow(null),
      updatedAt: Joi.date().allow(null),
    });
  }
}

module.exports = Currency;
