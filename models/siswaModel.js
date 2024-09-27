const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const WaliMurid = require("./waliMuridModel");
const AbsenSiswa = require("./absenSiswaModel");
const NilaiUts = require("./nilaiUtsModel");
const NilaiUas = require("./nilaiUasModel");

const Siswa = sequelize.define(
  "Siswa",
  {
    semester: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ttl: {
      type: DataTypes.STRING(30),
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

Siswa.hasOne(WaliMurid, { foreignKey: "siswaId" });
WaliMurid.belongsTo(Siswa, {
  foreignKey: "siswaId",
  allowNull: true,
  as: "siswa",
});

Siswa.hasMany(AbsenSiswa, { foreignKey: "siswaId" });
AbsenSiswa.belongsTo(Siswa, { foreignKey: "siswaId", as: "siswa" });

Siswa.hasMany(NilaiUts, { foreignKey: "siswaId" });
NilaiUts.belongsTo(Siswa, { foreignKey: "siswaId", as: "siswa" });

Siswa.hasMany(NilaiUas, { foreignKey: "siswaId" });
NilaiUas.belongsTo(Siswa, { foreignKey: "siswaId", as: "siswa" });

module.exports = Siswa;
