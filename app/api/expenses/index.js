const Expense = require('../../models/Expense');
const findRoute = require('../../helpers/findQueryByUserRoute')(Expense);
const createForUserRoute = require('../../helpers/createForUserRoute')(Expense);
const patchForUserRoute = require('../../helpers/patchForUserRoute')(Expense);
const deleteForUserRoute = require('../../helpers/deleteForUserRoute')(Expense);

module.exports = [
  findRoute,
  createForUserRoute,
  patchForUserRoute,
  deleteForUserRoute,
];
