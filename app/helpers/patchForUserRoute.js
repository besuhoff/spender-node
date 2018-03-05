const Joi = require('joi');
const Boom = require('boom');

module.exports = Model => (
  {
    path: '/{id}',
    method: 'PATCH',
    handler: async ({ params, payload, auth }) => {
      const userId = auth.credentials.user.id;

      const model = await Model.query().updateAndFetchById(params.id, { ...payload, userId });

      if (!model) {
        throw Boom.notFound();
      }

      return model;
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
