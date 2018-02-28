const Joi = require('joi');

module.exports = Model => (
  {
    path: '/',
    method: 'POST',
    handler: async ({ payload, auth }) => {
      const dataToInsert = { ...payload };
      const userId = auth.credentials.user.id;

      Object.keys(dataToInsert).forEach((key) => {
        if (key === '_isRemoved') {
          delete dataToInsert[key];
        }
        if (dataToInsert[key] instanceof Object) {
          Object.keys(dataToInsert[key]).forEach((keyLevel2) => {
            if (dataToInsert[key][keyLevel2] instanceof Object) {
              delete dataToInsert[key][keyLevel2];
            }

            if (keyLevel2 === '_isRemoved') {
              delete dataToInsert[key][keyLevel2];
            }
          });
        }
      });

      return Model.query()
        .insertGraph({ ...dataToInsert, userId }, { relate: true })
        .then(() => Model.query().where({ userId }).orderBy('id', 'desc').first());
    },
    config: {
      auth: 'GoogleAuthUser',
      validate: {
        payload: Model.joiSchema || Joi.object(),
      },
    },
  }
);
