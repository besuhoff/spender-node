const findQuery = require('objection-find');

module.exports = Model => (
  {
    path: '/',
    method: 'GET',
    handler: async ({ query }) => {
      const results = await findQuery(Model).build(query);
      let archive = [];
      const ArchiveModel = Model.archiveTable;

      if (ArchiveModel) {
        archive = await findQuery(ArchiveModel).build(query);
      }

      return results.concat(archive.map(item => ({ _isRemoved: true, ...item })));
    },
    config: {
      auth: 'GoogleAuthUser',
    },
  }
);
