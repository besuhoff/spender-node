const { Model } = require('objection');

class Limit extends Model {
  static get tableName() {
    return 'limit';
  }
}

module.exports = Limit;
