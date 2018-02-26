const Limit = require('../../models/Limit');
const findRoute = require('../../helpers/findQueryByUserRoute')(Limit);

module.exports = [
  findRoute,
];
