const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Admin = sequelize.define(
  "Admin",
  {
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ttl: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    jk: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    agama: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    noTelp: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Admin;
