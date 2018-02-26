const Expense = require('../../models/Expense');
const findRoute = require('../../helpers/findQueryByUserRoute')(Expense);

module.exports = [
  findRoute,
];
