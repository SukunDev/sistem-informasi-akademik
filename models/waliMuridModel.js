const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const WaliMurid = sequelize.define(
  "WaliMurid",
  {
    nama: {
      type: DataTypes.STRING(50),
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
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = WaliMurid;
