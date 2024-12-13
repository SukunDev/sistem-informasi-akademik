const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Kelas = require("./kelasModel");
const Guru = require("./guruModel"); // jika Anda memiliki model Guru

const WaliKelas = sequelize.define(
  "WaliKelas",
  {
    kelasId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kelas,
        key: "id",
      },
    },
    guruId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Guru,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

WaliKelas.belongsTo(Kelas, { foreignKey: "kelasId", as: "kelas" });
Kelas.hasOne(WaliKelas, { foreignKey: "kelasId" });

WaliKelas.belongsTo(Guru, { foreignKey: "guruId", as: "guru" });
Guru.hasOne(WaliKelas, { foreignKey: "guruId" });

module.exports = WaliKelas;
