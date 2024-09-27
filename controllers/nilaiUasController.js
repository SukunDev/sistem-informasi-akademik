const Kelas = require("../models/kelasModel");
const Matpel = require("../models/mataPelajaranModel");
const NilaiUas = require("../models/nilaiUasModel");
const Siswa = require("../models/siswaModel");
const WaliMurid = require("../models/waliMuridModel");

const validateInput = (nilai, siswaId, matpelId) => {
  if (!nilai) {
    return "field 'nilai' tidak boleh kosong";
  } else if (!siswaId) {
    return "field 'siswaId' tidak boleh kosong";
  } else if (!matpelId) {
    return "field 'matpelId' tidak boleh kosong";
  }
  return null;
};

const checkUserAccess = (user) => {
  if (user.hakAkses != "admin" && user.hakAkses != "guru") {
    return false;
  }
  return true;
};

exports.getNilaiUas = async (req, res) => {
  try {
    const nilaiUas = await NilaiUas.findAll({
      attributes: { exclude: ["siswaId", "kelasId", "matpelId"] },
      include: [
        { model: Siswa, as: "siswa" },
        { model: Kelas, as: "kelas" },
        { model: Matpel, as: "mataPelajaran" },
      ],
    });
    return res.status(200).json({ status: true, data: nilaiUas });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan pada server" });
  }
};

exports.getSiswaNilaiUas = async (req, res) => {
  try {
    const user = req.user;
    let siswaId;
    if (user.hakAkses == "siswa") {
      const siswa = await Siswa.findOne({
        where: { userId: user.id },
      });
      siswaId = siswa.id;
    } else if (user.hakAkses == "wali murid") {
      const wali = await WaliMurid.findOne({
        where: { userId: user.id },
      });
      siswaId = wali.siswaId;
    }
    if (!siswaId) {
      return res
        .status(400)
        .json({ status: false, message: "tidak dapat menemukan siswa" });
    }
    const nilaiUas = await NilaiUas.findAll({
      where: { siswaId: siswaId },
      attributes: { exclude: ["siswaId", "kelasId", "matpelId"] },
      include: [
        { model: Siswa, as: "siswa" },
        { model: Kelas, as: "kelas" },
        { model: Matpel, as: "mataPelajaran" },
      ],
    });
    return res.status(200).json({ satus: true, data: nilaiUas });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};

exports.createNilaiUas = async (req, res) => {
  try {
    const user = req.user;
    if (!checkUserAccess(user)) {
      return res
        .status(400)
        .json({ status: false, message: "Tidak memiliki akses" });
    }

    const { nilai, siswaId, matpelId } = req.body;
    const validationError = validateInput(nilai, siswaId, matpelId);
    if (validationError) {
      return res.status(400).json({ status: false, message: validationError });
    }

    const siswa = await Siswa.findOne({
      where: { id: siswaId },
      include: [{ model: Kelas, as: "kelas" }],
    });

    if (!siswa) {
      return res
        .status(400)
        .json({ status: false, message: "Siswa tidak ditemukan" });
    }

    const matpel = await Matpel.findOne({ where: { id: matpelId } });
    if (!matpel) {
      return res
        .status(400)
        .json({ status: false, message: "Mata pelajaran tidak ditemukan" });
    }

    const existingNilai = await NilaiUas.findOne({
      where: {
        siswaId,
        matpelId,
        semester: siswa.semester,
      },
    });

    if (existingNilai) {
      return res.status(400).json({
        status: false,
        message:
          "Nilai UAS untuk siswa ini sudah ada pada mata pelajaran dan semester tersebut",
      });
    }

    const createNilai = await NilaiUas.create({
      nilai,
      semester: siswa.semester,
      siswaId,
      kelasId: siswa.kelasId,
      matpelId,
    });

    return res.status(201).json({
      status: true,
      message: "Nilai UAS berhasil dibuat",
      data: createNilai,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan pada server" });
  }
};

exports.updateNilaiUas = async (req, res) => {
  try {
    const user = req.user;
    if (!checkUserAccess(user)) {
      return res
        .status(400)
        .json({ status: false, message: "Tidak memiliki akses" });
    }

    const { nilai, siswaId, matpelId } = req.body;
    const nilaiUasId = req.params.id;

    if (!nilaiUasId) {
      return res
        .status(400)
        .json({ status: false, message: "Query 'id' tidak boleh kosong" });
    }

    const validationError = validateInput(nilai, siswaId, matpelId);
    if (validationError) {
      return res.status(400).json({ status: false, message: validationError });
    }

    const siswa = await Siswa.findOne({
      where: { id: siswaId },
      include: [{ model: Kelas, as: "kelas" }],
    });
    if (!siswa) {
      return res
        .status(400)
        .json({ status: false, message: "Siswa tidak ditemukan" });
    }

    const matpel = await Matpel.findOne({ where: { id: matpelId } });
    if (!matpel) {
      return res
        .status(400)
        .json({ status: false, message: "Mata pelajaran tidak ditemukan" });
    }

    const nilaiUas = await NilaiUas.findOne({ where: { id: nilaiUasId } });
    if (!nilaiUas) {
      return res
        .status(400)
        .json({ status: false, message: "Nilai UAS tidak ditemukan" });
    }

    await nilaiUas.update({
      nilai,
      semester: siswa.semester,
      siswaId,
      kelasId: siswa.kelasId,
      matpelId,
    });

    return res.status(200).json({
      status: true,
      message: "Nilai UAS berhasil diupdate",
      data: nilaiUas,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan pada server" });
  }
};

exports.deleteNilaiUas = async (req, res) => {
  try {
    const user = req.user;
    const nilaiUasId = req.params.id;

    if (!checkUserAccess(user)) {
      return res
        .status(400)
        .json({ status: false, message: "Tidak memiliki akses" });
    }

    const nilaiUas = await NilaiUas.findOne({ where: { id: nilaiUasId } });
    if (!nilaiUas) {
      return res
        .status(400)
        .json({ status: false, message: "Nilai UAS tidak ditemukan" });
    }

    await nilaiUas.destroy();
    return res
      .status(200)
      .json({ status: true, message: "Nilai UAS berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan pada server" });
  }
};
