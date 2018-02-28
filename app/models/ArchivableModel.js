const { Model } = require('objection');

class ArchivableModel extends Model {
  async $beforeDelete(queryContext) {
    await super.$beforeDelete(queryContext);
    await this.constructor
      .knex()
      .table(`${this.constructor.tableName}_archive`)
      .insert({ ...this, archivedAt: new Date() });
  }

  $beforeInsert() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}

module.exports = ArchivableModel;
