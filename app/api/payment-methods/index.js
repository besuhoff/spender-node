const PaymentMethod = require('../../models/PaymentMethod');
const findRoute = require('../../helpers/findQueryByUserRoute')(PaymentMethod);

module.exports = [
  findRoute,
];
