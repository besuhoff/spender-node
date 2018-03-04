const { Model } = require('objection');

class ArchivableModel extends Model {
  async $beforeDelete(queryContext) {
    await super.$beforeDelete(queryContext);
    await this.constructor.archiveTable.query().insert({ ...this, archivedAt: new Date() });
  }

  $beforeInsert() {
    super.$beforeInsert();

    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    super.$beforeUpdate();

    this.updatedAt = new Date();
  }

  static get archiveTable() {
    const tableName = `${this.tableName}_archive`;

    class Table extends Model {
      static get tableName() { return tableName; }
    }

    return Table;
  }
}

module.exports = ArchivableModel;
