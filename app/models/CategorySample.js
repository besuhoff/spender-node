const { Model } = require('objection');
const Joi = require('joi');

class CategorySample extends Model {
  static get tableName() {
    return 'category_sample';
  }


  static get joiSchema() {
    return Joi.object({
      name: Joi.string().max(255).required(), // TODO add i18n
      color: Joi.string().max(9).regex(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i),
    });
  }
}

module.exports = CategorySample;
