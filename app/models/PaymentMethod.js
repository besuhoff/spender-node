const { Model } = require('objection');
const Joi = require('joi');

const ArchivableModel = require('./ArchivableModel');

class PaymentMethod extends ArchivableModel {
  static get tableName() {
    return 'payment_method';
  }

  static get relationMappings() {
    return {
      currency: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Currency`,
        join: {
          from: 'currency.id',
          to: 'payment_method.currency_id',
        },
      },
      expenses: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Expense`,
        join: {
          from: 'expense.payment_method_id',
          to: 'payment_method.id',
        },
      },
      incomes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Income`,
        join: {
          from: 'income.payment_method_id',
          to: 'payment_method.id',
        },
      },
    };
  }

  static get joiSchema() {
    return Joi.object({
      name: Joi.string().max(255).required(),
      color: Joi.string().max(9).regex(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i),
      currencyId: Joi.number().positive().required(),
      initialAmount: Joi.number().precision(4).default(0).required(),

      id: Joi.number().positive().allow(null),
      userId: Joi.number().positive().allow(null),
      createdAt: Joi.date().allow(null),
      updatedAt: Joi.date().allow(null),
      _isRemoved: Joi.boolean(),

      expenses: Joi.number().min(0).allow(null),
      incomes: Joi.number().min(0).allow(null),
    });
  }

  $beforeUpdate() {
    super.$beforeUpdate();

    delete this.incomes;
    delete this.expenses;
  }

  $parseJson(json, opt) {
    if (typeof json.expenses === 'number') {
      delete json.expenses;
    }
    if (typeof json.incomes === 'number') {
      delete json.incomes;
    }

    return super.$parseJson(json, opt);
  }
}

module.exports = PaymentMethod;
