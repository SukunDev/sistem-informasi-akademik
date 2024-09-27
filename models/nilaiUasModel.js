const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const NilaiUas = sequelize.define(
  "NilaiUas",
  {
    nilai: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = NilaiUas;
