const IncomeCategory = require('../../models/IncomeCategory');
const findRoute = require('../../helpers/findQueryByUserRoute')(IncomeCategory);

module.exports = [
  findRoute,
];
