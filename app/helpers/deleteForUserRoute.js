const Joi = require('joi');
const Boom = require('boom');

module.exports = Model => (
  {
    path: '/{id}',
    method: 'DELETE',
    handler: async ({ params, auth }) => {
      const model = await Model
        .query()
        .where({ id: params.id, userId: auth.credentials.user.id })
        .first();

      if (!model) {
        throw Boom.notFound();
      }

      return model.$query().delete();
    },
    config: {
      auth: 'GoogleAuthUser',
      validate: {
        params: {
          id: Joi.number().integer().positive().required(),
        },
      },
    },
  }
);
