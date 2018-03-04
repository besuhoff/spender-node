const { Model } = require('objection');
const Joi = require('joi');

const ArchivableModel = require('./ArchivableModel');

class Expense extends ArchivableModel {
  static get tableName() {
    return 'expense';
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Category`,
        join: {
          from: 'category.id',
          to: 'expense.category_id',
        },
      },
      paymentMethod: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/PaymentMethod`,
        join: {
          from: 'payment_method.id',
          to: 'expense.payment_method_id',
        },
      },
      targetIncome: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Income`,
        join: {
          from: 'income.id',
          to: 'expense.target_income_id',
        },
      },
    };
  }

  static get joiSchema() {
    return Joi.object({
      amount: Joi.number().precision(4).required(),
      comment: Joi.string().max(2048),
      categoryId: Joi.number().positive().allow(null).without('targetIncomeId'),
      paymentMethodId: Joi.number().positive().required(),
      targetIncomeId: Joi.number().positive().allow(null).without('categoryId'),

      id: Joi.number().positive().allow(null),
      userId: Joi.number().positive().allow(null),
      createdAt: Joi.date().allow(null),
      updatedAt: Joi.date().allow(null),
      _isRemoved: Joi.boolean(),
    });
  }
}

module.exports = Expense;
