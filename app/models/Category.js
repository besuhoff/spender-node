const { Model } = require('objection');
const Joi = require('joi');

class Category extends Model {
  static get tableName() {
    return 'category';
  }

  static get joiSchema() {
    return Joi.object({
      name: Joi.string().max(255).required(),
      color: Joi.string().max(9).required(),
    });
  }
}

module.exports = Category;
