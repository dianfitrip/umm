const { DataTypes } = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcryptjs"); // Pastikan library ini ada

const User = db.define(
  "User",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "asesor", "asesi", "tuk"),
      defaultValue: "asesi",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true, // Sesuai dengan created_at dan updated_at di SQL Anda
    hooks: {
      // Enkripsi password sebelum disimpan (Register)
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      // Enkripsi password jika diubah (Update Profile)
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// =================================================================
// BAGIAN PENTING INI YANG SEBELUMNYA HILANG:
// =================================================================
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;