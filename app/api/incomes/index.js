const Income = require('../../models/Income');
const findRoute = require('../../helpers/findQueryByUserRoute')(Income);

module.exports = [
  findRoute,
];
