const Matpel = require("../models/mataPelajaranModel");

exports.getMatpel = async (req, res) => {
  try {
    const matpel = await Matpel.findAll();
    return res.status(200).json({ satus: true, data: matpel });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};

exports.createMatpel = async (req, res) => {
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
    const checkMatpel = await Matpel.findOne({ where: { nama } });
    if (checkMatpel) {
      return res
        .status(400)
        .json({ status: false, message: "matpel sudah pernah di buat" });
    }
    const matpel = await Matpel.create({ nama: nama });
    return res
      .status(201)
      .json({ satus: true, message: "matpel berhasil di buat", data: matpel });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};

exports.updateMatpel = async (req, res) => {
  try {
    const { nama } = req.body;
    const matpelId = req.params.id;
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
    const matpel = await Matpel.findOne({ where: { id: matpelId } });
    if (!matpel) {
      return res.status(400).json({
        status: false,
        message: "matpel tidak di temukan",
      });
    }
    matpel.update({ nama: nama });
    return res.status(201).json({
      satus: true,
      message: "mata pelajaran berhasil di ubah",
      data: matpel,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};

exports.deleteMatpel = async (req, res) => {
  try {
    const matpelId = req.params.id;
    const user = req.user;
    if (user.hakAkses !== "admin") {
      return res
        .status(400)
        .json({ status: false, message: "kamu tidak memiliki akses" });
    }
    const matpel = await Matpel.findOne({ where: { id: matpelId } });
    if (!matpel) {
      return res.status(400).json({
        status: false,
        message: "matpel tidak di temukan",
      });
    }
    matpel.destroy();
    return res
      .status(201)
      .json({ satus: true, message: "mata pelajaran berhasil di hapus" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};
