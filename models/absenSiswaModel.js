const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AbsenSiswa = sequelize.define(
  "AbsenSiswa",
  {
    semester: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    tglAbsen: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    hariAbsen: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = AbsenSiswa;
