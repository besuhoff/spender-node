const { Model } = require('objection');

class Limit extends Model {
  static get tableName() {
    return 'category';
  }
}

module.exports = Limit;
