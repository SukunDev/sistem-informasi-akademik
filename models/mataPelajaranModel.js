const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const NilaiUts = require("./nilaiUtsModel");
const NilaiUas = require("./nilaiUasModel");
const Jadwal = require("./jadwalPelajaranModel");

const Matpel = sequelize.define(
  "Matpel",
  {
    nama: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Matpel.hasOne(NilaiUts, { foreignKey: "matpelId" });
NilaiUts.belongsTo(Matpel, { foreignKey: "matpelId", as: "mataPelajaran" });

Matpel.hasOne(NilaiUas, { foreignKey: "matpelId" });
NilaiUas.belongsTo(Matpel, { foreignKey: "matpelId", as: "mataPelajaran" });

Matpel.hasMany(Jadwal, { foreignKey: "matpelId" });
Jadwal.belongsTo(Matpel, { foreignKey: "matpelId", as: "mataPelajaran" });

module.exports = Matpel;
