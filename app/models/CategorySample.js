const { Model } = require('objection');

class CategorySample extends Model {
  static get tableName() {
    return 'category_sample';
  }
}

module.exports = CategorySample;
