const Kelas = require("../models/kelasModel");

exports.getKelas = async (req, res) => {
  try {
    const kelas = await Kelas.findAll();
    return res.status(200).json({ satus: true, data: kelas });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
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
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
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
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
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
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};
