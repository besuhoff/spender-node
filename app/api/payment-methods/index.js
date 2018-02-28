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
        .then(paymentMethods => Promise.all(paymentMethods.map(paymentMethod => Promise.all([
          paymentMethod,
          paymentMethod.$relatedQuery('expenses').sum('amount as expenses').first(),
          paymentMethod.$relatedQuery('incomes').sum('amount as incomes').first(),
        ])
          .then(([model, { expenses }, { incomes }]) => ({ ...model, incomes, expenses })))));
    },
    config: {
      auth: 'GoogleAuthUser',
    },
  },
  createForUserRoute,
  patchForUserRoute,
  deleteForUserRoute,
];
