const findQuery = require('objection-find');

module.exports = Model => (
  {
    path: '/',
    method: 'GET',
    handler: async ({ query, auth }) => {
      const params = { userId: auth.credentials.user.id, ...query };

      const results = await findQuery(Model).build(params);
      let archive = [];
      const ArchiveModel = Model.archiveTable;

      if (ArchiveModel) {
        archive = await findQuery(ArchiveModel).build(params);
      }

      return results.concat(archive.map(item => ({ _isRemoved: true, ...item })));
    },
    config: {
      auth: 'GoogleAuthUser',
    },
  }
);
