// Node Module used for DB queries ( https://www.npmjs.com/package/sequelize )
const Sequelize = require('sequelize');
// Including db.js which contains the database configuration
const db = require('../config/db');


module.exports = db.define('attributes', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  keyword: {
    type: Sequelize.STRING, // Type of column
    allowNull: false,
    unique: true, // unique constraint
  }
});
