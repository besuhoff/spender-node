const findQuery = require('objection-find');

const PaymentMethod = require('../../models/PaymentMethod');
const createForUserRoute = require('../../helpers/createForUserRoute')(PaymentMethod);
const patchForUserRoute = require('../../helpers/patchForUserRoute')(PaymentMethod);
const deleteForUserRoute = require('../../helpers/deleteForUserRoute')(PaymentMethod);


module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: async ({ query, auth }) => {
      const params = { userId: auth.credentials.user.id, ...query };

      return findQuery(PaymentMethod)
        .build(params)
        .select(
          'payment_method.*',
          PaymentMethod.relatedQuery('expenses').sum('amount').as('expenses'),
          PaymentMethod.relatedQuery('incomes').sum('amount').as('incomes'),
        );
    },
    config: {
      auth: 'GoogleAuthUser',
    },
  },
  createForUserRoute,
  patchForUserRoute,
  deleteForUserRoute,
];
