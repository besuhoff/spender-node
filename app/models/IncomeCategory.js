const { Model } = require('objection');

class IncomeCategory extends Model {
  static get tableName() {
    return 'income_category';
  }
}

module.exports = IncomeCategory;
