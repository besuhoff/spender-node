const Joi = require('joi');
const Boom = require('boom');

module.exports = Model => (
  {
    path: '/{id}',
    method: 'PATCH',
    handler: async ({ params, payload, auth }) => {
      const model = await Model
        .query()
        .where({ id: params.id, userId: auth.credentials.user.id })
        .first();

      if (!model) {
        throw Boom.notFound();
      }

      const dataToUpdate = { ...payload };

      Object.keys(dataToUpdate).forEach((key) => {
        if (key === '_isRemoved') {
          delete dataToUpdate[key];
        }
        if (dataToUpdate[key] instanceof Object) {
          Object.keys(dataToUpdate[key]).forEach((keyLevel2) => {
            if (dataToUpdate[key][keyLevel2] instanceof Object) {
              delete dataToUpdate[key][keyLevel2];
            }

            if (keyLevel2 === '_isRemoved') {
              delete dataToUpdate[key][keyLevel2];
            }
          });
        }
      });

      return Model.query()
        .upsertGraph({
          ...dataToUpdate,
          id: params.id,
          userId: auth.credentials.user.id,
        }, { relate: true, unrelate: true })
        .then(() => Model.query().findById(model.id));
    },
    config: {
      auth: 'GoogleAuthUser',
      validate: {
        payload: Model.joiSchema ? Model.joiSchema.optionalKeys('') : Joi.object(),
        params: {
          id: Joi.number().integer().positive().required(),
        },
      },
    },
  }
);
