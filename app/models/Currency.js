const { Model } = require('objection');

class Currency extends Model {
  static get tableName() {
    return 'currency';
  }
}

module.exports = Currency;
