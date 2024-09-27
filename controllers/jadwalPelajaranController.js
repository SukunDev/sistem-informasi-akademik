const Guru = require("../models/guruModel");
const Jadwal = require("../models/jadwalPelajaranModel");
const Kelas = require("../models/kelasModel");
const Matpel = require("../models/mataPelajaranModel");

exports.getJadwalPelajaran = async (req, res) => {
  try {
    const jadwal = await Jadwal.findAll({
      attributes: { exclude: ["guruId", "kelasId", "matpelId"] },
      include: [
        {
          model: Guru,
          as: "guru",
        },
        {
          model: Kelas,
          as: "kelas",
        },
        {
          model: Matpel,
          as: "mataPelajaran",
        },
      ],
    });
    return res.status(200).json({ satus: true, data: jadwal });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};

exports.getJadwalGuru = async (req, res) => {
  try {
    const user = req.user;
    const guru = await Guru.findOne({
      where: { userId: user.id },
    });
    if (!guru) {
      return res
        .status(400)
        .json({ status: false, message: "tidak dapat menemukan guru" });
    }
    const jadwal = await Jadwal.findAll({ where: { guruId: guru.id } });
    return res.status(200).json({ satus: true, data: jadwal });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};

exports.createJadwalPelajaran = async (req, res) => {
  try {
    const user = req.user;
    if (user.hakAkses != "admin") {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }
    const { hari, jam, guruId, kelasId, matpelId } = req.body;
    if (!hari) {
      return res.status(400).json({
        status: false,
        message: "field 'hari' tidak boleh kosong",
      });
    } else if (!jam) {
      return res.status(400).json({
        status: false,
        message: "field 'jam' tidak boleh kosong",
      });
    } else if (!guruId) {
      return res.status(400).json({
        status: false,
        message: "field 'guruId' tidak boleh kosong",
      });
    } else if (!kelasId) {
      return res.status(400).json({
        status: false,
        message: "field 'kelasId' tidak boleh kosong",
      });
    } else if (!matpelId) {
      return res.status(400).json({
        status: false,
        message: "field 'matpelId' tidak boleh kosong",
      });
    }
    const jadwal = await Jadwal.create({
      hari: hari,
      jam: jam,
      guruId: guruId,
      kelasId: kelasId,
      matpelId: matpelId,
    });
    return res.status(201).json({
      status: true,
      message: "berhasil membuat jadwal pelajaran",
      data: jadwal,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};

exports.updateJadwalPelajaran = async (req, res) => {
  try {
    const user = req.user;
    if (user.hakAkses != "admin") {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }
    const jadwalId = req.params.id;
    const { hari, jam, guruId, kelasId, matpelId } = req.body;
    if (!hari) {
      return res.status(400).json({
        status: false,
        message: "field 'hari' tidak boleh kosong",
      });
    } else if (!jam) {
      return res.status(400).json({
        status: false,
        message: "field 'jam' tidak boleh kosong",
      });
    } else if (!guruId) {
      return res.status(400).json({
        status: false,
        message: "field 'guruId' tidak boleh kosong",
      });
    } else if (!kelasId) {
      return res.status(400).json({
        status: false,
        message: "field 'kelasId' tidak boleh kosong",
      });
    } else if (!matpelId) {
      return res.status(400).json({
        status: false,
        message: "field 'matpelId' tidak boleh kosong",
      });
    } else if (!jadwalId) {
      return res.status(400).json({
        status: false,
        message: "query 'id' tidak boleh kosong",
      });
    }
    const jadwal = await Jadwal.findOne({ where: { id: jadwalId } });
    if (!jadwal) {
      return res.status(400).json({
        status: false,
        message: "jadwal pelajaran tidak di temukan",
      });
    }
    jadwal.update({
      hari: hari,
      jam: jam,
      guruId: guruId,
      kelasId: kelasId,
      matpelId: matpelId,
    });
    return res.status(201).json({
      status: true,
      message: "berhasil mengubah jadwal pelajaran",
      data: jadwal,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};

exports.deleteJadwalPelajaran = async (req, res) => {
  try {
    const jadwalId = req.params.id;
    const user = req.user;
    if (user.hakAkses !== "admin") {
      return res
        .status(400)
        .json({ status: false, message: "kamu tidak memiliki akses" });
    }
    const jadwal = await Jadwal.findOne({ where: { id: jadwalId } });
    if (!jadwal) {
      return res.status(400).json({
        status: false,
        message: "jadwal pelajaran tidak di temukan",
      });
    }
    jadwal.destroy();
    return res
      .status(201)
      .json({ satus: true, message: "jadwal pelajaran berhasil di hapus" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};
