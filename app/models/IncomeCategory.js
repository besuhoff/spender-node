const ArchivableModel = require('./ArchivableModel');
const Joi = require('joi');

class IncomeCategory extends ArchivableModel {
  static get tableName() {
    return 'income_category';
  }

  static get joiSchema() {
    return Joi.object({
      name: Joi.string().max(255).required(),
      color: Joi.string().max(9).regex(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i).allow(null).allow(''),

      id: Joi.number().positive().allow(null),
      userId: Joi.number().positive().allow(null),
      createdAt: Joi.date().allow(null),
      updatedAt: Joi.date().allow(null),
      _isRemoved: Joi.boolean(),
    });
  }
}

module.exports = IncomeCategory;
