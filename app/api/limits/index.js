const Limit = require('../../models/Limit');
const findRoute = require('../../helpers/findQueryRoute')(Limit);

module.exports = [
  findRoute,
];
