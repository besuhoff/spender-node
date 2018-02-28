const Income = require('../../models/Income');
const findRoute = require('../../helpers/findQueryByUserRoute')(Income);
const createForUserRoute = require('../../helpers/createForUserRoute')(Income);
const patchForUserRoute = require('../../helpers/patchForUserRoute')(Income);
const deleteForUserRoute = require('../../helpers/deleteForUserRoute')(Income);

module.exports = [
  findRoute,
  createForUserRoute,
  patchForUserRoute,
  deleteForUserRoute,
];
