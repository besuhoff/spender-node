const PaymentMethod = require('../../models/PaymentMethod');
const findRoute = require('../../helpers/findQueryRoute')(PaymentMethod);

module.exports = [
  findRoute,
];
