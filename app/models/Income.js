const { Model } = require('objection');
const Joi = require('joi');

const ArchivableModel = require('./ArchivableModel');

class Income extends ArchivableModel {
  static get tableName() {
    return 'income';
  }

  static get relationMappings() {
    return {
      incomeCategory: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/IncomeCategory`,
        join: {
          from: 'income_category.id',
          to: 'income.income_category_id',
        },
      },
      paymentMethod: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/PaymentMethod`,
        join: {
          from: 'payment_method.id',
          to: 'income.payment_method_id',
        },
      },
    };
  }

  static get joiSchema() {
    return Joi.object({
      amount: Joi.number().precision(4).required(),
      comment: Joi.string().max(2048),
      incomeCategoryId: Joi.number().positive().allow(null),
      paymentMethodId: Joi.number().positive().allow(null),

      id: Joi.number().positive().allow(null),
      userId: Joi.number().positive().allow(null),
      createdAt: Joi.date().allow(null),
      updatedAt: Joi.date().allow(null),
      _isRemoved: Joi.boolean(),
    });
  }
}

module.exports = Income;
