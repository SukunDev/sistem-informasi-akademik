const Kelas = require("../models/kelasModel");
const Matpel = require("../models/mataPelajaranModel");
const NilaiUts = require("../models/nilaiUtsModel");
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

exports.getNilaiUts = async (req, res) => {
  try {
    const nilaiUts = await NilaiUts.findAll({
      attributes: { exclude: ["siswaId", "kelasId", "matpelId"] },
      include: [
        { model: Siswa, as: "siswa" },
        { model: Kelas, as: "kelas" },
        { model: Matpel, as: "mataPelajaran" },
      ],
    });
    return res.status(200).json({ status: true, data: nilaiUts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan pada server" });
  }
};

exports.getSiswaNilaiUts = async (req, res) => {
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
    const nilaiUts = await NilaiUts.findAll({
      where: { siswaId: siswaId },
      attributes: { exclude: ["siswaId", "kelasId", "matpelId"] },
      include: [
        { model: Siswa, as: "siswa" },
        { model: Kelas, as: "kelas" },
        { model: Matpel, as: "mataPelajaran" },
      ],
    });
    return res.status(200).json({ satus: true, data: nilaiUts });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};

exports.createNilaiUts = async (req, res) => {
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

    const existingNilai = await NilaiUts.findOne({
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
          "Nilai UTS untuk siswa ini sudah ada pada mata pelajaran dan semester tersebut",
      });
    }

    const createNilai = await NilaiUts.create({
      nilai,
      semester: siswa.semester,
      siswaId,
      kelasId: siswa.kelasId,
      matpelId,
    });

    return res.status(201).json({
      status: true,
      message: "Nilai UTS berhasil dibuat",
      data: createNilai,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan pada server" });
  }
};

exports.updateNilaiUts = async (req, res) => {
  try {
    const user = req.user;
    if (!checkUserAccess(user)) {
      return res
        .status(400)
        .json({ status: false, message: "Tidak memiliki akses" });
    }

    const { nilai, siswaId, matpelId } = req.body;
    const nilaiUtsId = req.params.id;

    if (!nilaiUtsId) {
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

    const nilaiUts = await NilaiUts.findOne({ where: { id: nilaiUtsId } });
    if (!nilaiUts) {
      return res
        .status(400)
        .json({ status: false, message: "Nilai UTS tidak ditemukan" });
    }

    await nilaiUts.update({
      nilai,
      semester: siswa.semester,
      siswaId,
      kelasId: siswa.kelasId,
      matpelId,
    });

    return res.status(200).json({
      status: true,
      message: "Nilai UTS berhasil diupdate",
      data: nilaiUts,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan pada server" });
  }
};

exports.deleteNilaiUts = async (req, res) => {
  try {
    const user = req.user;
    const nilaiUtsId = req.params.id;

    if (!checkUserAccess(user)) {
      return res
        .status(400)
        .json({ status: false, message: "Tidak memiliki akses" });
    }

    const nilaiUts = await NilaiUts.findOne({ where: { id: nilaiUtsId } });
    if (!nilaiUts) {
      return res
        .status(400)
        .json({ status: false, message: "Nilai UTS tidak ditemukan" });
    }

    await nilaiUts.destroy();
    return res
      .status(200)
      .json({ status: true, message: "Nilai UTS berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan pada server" });
  }
};
