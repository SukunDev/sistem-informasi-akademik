const Guru = require("../models/guruModel");
const Jadwal = require("../models/jadwalPelajaranModel");
const Kelas = require("../models/kelasModel");
const Siswa = require("../models/siswaModel");

exports.getKelas = async (req, res) => {
  try {
    const kelas = await Kelas.findAll({
      include: [
        {
          model: Siswa,
          as: "siswa",
          attributes: { exclude: ["kelasId", "userId"] },
        },
      ],
    });
    return res.status(200).json({ satus: true, data: kelas });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getKelasByGuru = async (req, res) => {
  try {
    const user = req.user;
    const guru = await Guru.findOne({
      where: { userId: user.id },
    });

    if (!guru) {
      return res
        .status(400)
        .json({ status: false, message: "Guru tidak ditemukan" });
    }

    const jadwal = await Jadwal.findAll({
      where: { guruId: guru.id },
    });

    if (!jadwal.length) {
      return res
        .status(400)
        .json({ status: false, message: "Guru belum memiliki kelas ajar" });
    }
    const seen = new Set();
    const filterJadwal = jadwal.filter((item) => {
      if (seen.has(item.kelasId)) {
        return false;
      }
      seen.add(item.kelasId);
      return true;
    });
    const kelasIds = filterJadwal.map((item) => item.kelasId);
    const kelas = await Kelas.findAll({
      where: { id: kelasIds },
      include: [
        {
          model: Siswa,
          as: "siswa",
          attributes: { exclude: ["kelasId", "userId"] },
        },
      ],
    });
    const kelasData = kelas.map((k) => k.toJSON());

    return res.status(200).json({ status: true, data: kelasData });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan server" });
  }
};
exports.getSingleKelasByGuru = async (req, res) => {
  try {
    const { kelasId } = req.params;
    const user = req.user;

    const guru = await Guru.findOne({
      where: { userId: user.id },
    });

    if (!guru) {
      return res
        .status(400)
        .json({ status: false, message: "Guru tidak ditemukan" });
    }

    const jadwal = await Jadwal.findOne({
      where: { guruId: guru.id, kelasId: kelasId },
    });

    if (!jadwal) {
      return res
        .status(400)
        .json({ status: false, message: "Anda tidak memiliki kelas ajar" });
    }

    const kelas = await Kelas.findOne({
      where: { id: kelasId },
      include: [
        {
          model: Siswa,
          as: "siswa",
          attributes: { exclude: ["kelasId", "userId"] },
        },
      ],
    });

    if (!kelas) {
      return res
        .status(400)
        .json({ status: false, message: "Kelas tidak ditemukan" });
    }

    const kelasData = kelas.toJSON();

    return res.status(200).json({ status: true, data: kelasData });
  } catch (error) {
    console.error("Error fetching single kelas by guru:", error);
    return res
      .status(500)
      .json({ status: false, message: "Terjadi kesalahan server" });
  }
};

exports.getSingleKelas = async (req, res) => {
  try {
    const kelasId = req.params.id;
    if (!kelasId) {
      return res
        .status(400)
        .json({ status: false, message: "query 'id' is empty" });
    }
    const kelas = await Kelas.findOne({
      where: { id: kelasId },
      include: [
        {
          model: Siswa,
          as: "siswa",
          attributes: { exclude: ["kelasId", "userId"] },
        },
      ],
    });
    if (!kelas) {
      return res
        .status(400)
        .json({ status: false, message: "kelas not found" });
    }
    return res.status(200).json({ satus: true, data: kelas });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.createKelas = async (req, res) => {
  try {
    const { nama } = req.body;
    const user = req.user;
    if (user.hakAkses !== "admin") {
      return res
        .status(400)
        .json({ status: false, message: "kamu tidak memiliki akses" });
    }
    if (!nama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nama' kosong" });
    }
    const checkKelas = await Kelas.findOne({ where: { nama } });
    if (checkKelas) {
      return res
        .status(400)
        .json({ status: false, message: "kelas sudah pernah di buat" });
    }
    const kelas = await Kelas.create({ nama: nama });
    return res
      .status(201)
      .json({ satus: true, message: "kelas berhasil di buat", data: kelas });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateKelas = async (req, res) => {
  try {
    const { nama } = req.body;
    const kelasId = req.params.id;
    const user = req.user;
    if (user.hakAkses !== "admin") {
      return res
        .status(400)
        .json({ status: false, message: "kamu tidak memiliki akses" });
    }
    if (!nama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nama' kosong" });
    }
    const kelas = await Kelas.findOne({ where: { id: kelasId } });
    if (!kelas) {
      return res.status(400).json({
        status: false,
        message: "kelas tidak di temukan",
      });
    }
    kelas.update({ nama: nama });
    return res
      .status(201)
      .json({ satus: true, message: "kelas berhasil di ubah", data: kelas });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteKelas = async (req, res) => {
  try {
    const kelasId = req.params.id;
    const user = req.user;
    if (user.hakAkses !== "admin") {
      return res
        .status(400)
        .json({ status: false, message: "kamu tidak memiliki akses" });
    }
    const kelas = await Kelas.findOne({ where: { id: kelasId } });
    if (!kelas) {
      return res.status(400).json({
        status: false,
        message: "kelas tidak di temukan",
      });
    }
    kelas.destroy();
    return res
      .status(201)
      .json({ satus: true, message: "kelas berhasil di hapus" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
