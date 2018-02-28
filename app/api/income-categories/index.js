const IncomeCategory = require('../../models/IncomeCategory');
const findRoute = require('../../helpers/findQueryByUserRoute')(IncomeCategory);
const createForUserRoute = require('../../helpers/createForUserRoute')(IncomeCategory);
const patchForUserRoute = require('../../helpers/patchForUserRoute')(IncomeCategory);
const deleteForUserRoute = require('../../helpers/deleteForUserRoute')(IncomeCategory);

module.exports = [
  findRoute,
  createForUserRoute,
  patchForUserRoute,
  deleteForUserRoute,
];
