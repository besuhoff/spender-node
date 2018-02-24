const { Model } = require('objection');

class Income extends Model {
  static get tableName() {
    return 'income';
  }
}

module.exports = Income;
