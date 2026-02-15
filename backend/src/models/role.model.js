const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Role = db.define("Role", {

  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },

  role_name: {
    type: DataTypes.STRING
  }

},{
  tableName:"roles",
  timestamps:false
});

module.exports = Role;
