const Income = require('../../models/Income');
const findRoute = require('../../helpers/findQueryRoute')(Income);

module.exports = [
  findRoute,
];
