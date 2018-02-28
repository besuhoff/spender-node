const Limit = require('../../models/Limit');
const findRoute = require('../../helpers/findQueryByUserRoute')(Limit);
const createForUserRoute = require('../../helpers/createForUserRoute')(Limit);
const patchForUserRoute = require('../../helpers/patchForUserRoute')(Limit);
const deleteForUserRoute = require('../../helpers/deleteForUserRoute')(Limit);

module.exports = [
  findRoute,
  createForUserRoute,
  patchForUserRoute,
  deleteForUserRoute,
];
