const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Jadwal = sequelize.define(
  "Jadwal",
  {
    hari: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    jam: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Jadwal;
