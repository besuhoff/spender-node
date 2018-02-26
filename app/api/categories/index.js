const Category = require('../../models/Category');
const findRoute = require('../../helpers/findQueryByUserRoute')(Category);

module.exports = [
  findRoute,
];
