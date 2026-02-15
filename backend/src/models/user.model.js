const { DataTypes } = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcryptjs");

const User = db.define(
  "User",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    id_role: {
      type: DataTypes.INTEGER,
    },

    no_hp: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status_user: {
      type: DataTypes.STRING,
      defaultValue: "aktif",
    },

    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// fungsi cek password
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password_hash);
};

module.exports = User;
