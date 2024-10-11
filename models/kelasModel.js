const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Siswa = require("./siswaModel");
const Jadwal = require("./jadwalPelajaranModel");
const AbsenSiswa = require("./absenSiswaModel");
const NilaiUts = require("./nilaiUtsModel");
const NilaiUas = require("./nilaiUasModel");

const Kelas = sequelize.define(
  "Kelas",
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

Kelas.hasMany(Siswa, { foreignKey: "kelasId", as: "siswa" });
Siswa.belongsTo(Kelas, { foreignKey: "kelasId", as: "kelas" });

Kelas.hasMany(Jadwal, { foreignKey: "kelasId" });
Jadwal.belongsTo(Kelas, { foreignKey: "kelasId", as: "kelas" });

Kelas.hasMany(AbsenSiswa, { foreignKey: "kelasId" });
AbsenSiswa.belongsTo(Kelas, { foreignKey: "kelasId", as: "kelas" });

Kelas.hasMany(NilaiUts, { foreignKey: "kelasId" });
NilaiUts.belongsTo(Kelas, { foreignKey: "kelasId", as: "kelas" });

Kelas.hasMany(NilaiUas, { foreignKey: "kelasId" });
NilaiUas.belongsTo(Kelas, { foreignKey: "kelasId", as: "kelas" });

module.exports = Kelas;
