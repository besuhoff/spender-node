const Category = require('../../models/Category');
const findRoute = require('../../helpers/findQueryByUserRoute')(Category);
const createForUserRoute = require('../../helpers/createForUserRoute')(Category);
const patchForUserRoute = require('../../helpers/patchForUserRoute')(Category);
const deleteForUserRoute = require('../../helpers/deleteForUserRoute')(Category);

module.exports = [
  findRoute,
  createForUserRoute,
  patchForUserRoute,
  deleteForUserRoute,
];
