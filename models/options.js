// Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const Sequelize = require('sequelize');
// Including db.js which contains the database configuration
const db = require('../config/db');


module.exports = db.define('options', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  attribute_id: {
    type: Sequelize.INTEGER, // Type of column
  },
  prediction_id: {
    type: Sequelize.INTEGER, // Type of column
  },
});

