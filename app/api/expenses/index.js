const Expense = require('../../models/Expense');
const findRoute = require('../../helpers/findQueryRoute')(Expense);

module.exports = [
  findRoute,
];
