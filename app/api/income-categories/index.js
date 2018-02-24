const IncomeCategory = require('../../models/IncomeCategory');
const findRoute = require('../../helpers/findQueryRoute')(IncomeCategory);

module.exports = [
  findRoute,
];
