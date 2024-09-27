const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const NilaiUts = sequelize.define(
  "NilaiUts",
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

module.exports = NilaiUts;
