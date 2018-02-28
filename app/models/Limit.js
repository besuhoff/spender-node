const ArchivableModel = require('./ArchivableModel');
const Joi = require('joi');

class Limit extends ArchivableModel {
  static get tableName() {
    return 'limit';
  }

  static get joiSchema() {
    return Joi.object({
      name: Joi.string().max(255).required(),
      color: Joi.string().max(9).regex(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i),
      value: Joi.number().precision(4).default(0).required(),
      period: Joi.string().max(255).required(),

      id: Joi.number().positive().allow(null),
      userId: Joi.number().positive().allow(null),
      createdAt: Joi.date().allow(null),
      updatedAt: Joi.date().allow(null),
      _isRemoved: Joi.boolean(),
    });
  }
}

module.exports = Limit;
