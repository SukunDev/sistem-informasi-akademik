const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Jadwal = require("./jadwalPelajaranModel");

const Guru = sequelize.define(
  "Guru",
  {
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nig: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ttl: {
      type: DataTypes.STRING(50),
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

Guru.hasMany(Jadwal, { foreignKey: "guruId" });
Jadwal.belongsTo(Guru, { foreignKey: "guruId", as: "guru" });

module.exports = Guru;
