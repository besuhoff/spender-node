const findQuery = require('objection-find');

module.exports = async (Model, params) => {
  const results = await findQuery(Model).build(params);
  let archive = [];
  const ArchiveModel = Model.archiveTable;

  if (ArchiveModel) {
    archive = await findQuery(ArchiveModel).build(params);
  }

  return results.concat(archive.map(item => ({ _isRemoved: true, ...item })));
};
