const Currency = require('../../models/Currency');
const findRoute = require('../../helpers/findQueryRoute')(Currency);

module.exports = [
  findRoute,
];
