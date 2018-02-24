const Category = require('../../models/Category');
const findRoute = require('../../helpers/findQueryRoute')(Category);

module.exports = [
  findRoute,
];
