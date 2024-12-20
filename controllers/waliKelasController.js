const WaliKelas = require("../models/waliKelasModel");
const Guru = require("../models/guruModel");
const Kelas = require("../models/kelasModel");
const Siswa = require("../models/siswaModel");
const NilaiUas = require("../models/nilaiUasModel");
const NilaiUts = require("../models/nilaiUtsModel");
const WaliMurid = require("../models/waliMuridModel");
const Matpel = require("../models/mataPelajaranModel");

exports.getWaliKelas = async (req, res) => {
  try {
    const wali = await WaliKelas.findAll({
      attributes: { exclude: ["guruId", "kelasId"] },
      include: [
        {
          model: Guru,
          as: "guru",
        },
        {
          model: Kelas,
          as: "kelas",
        },
      ],
    });
    return res.status(200).json({ satus: true, data: wali });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getWaliKelasByGuru = async (req, res) => {
  try {
    const guru = await Guru.findOne({
      where: { userId: req.user.id },
    });
    if (!guru) {
      return res
        .status(404)
        .json({ status: false, message: "tidak dapat menemukan guru" });
    }

    const wali = await WaliKelas.findOne({
      where: { guruId: guru.id },
      attributes: { exclude: ["guruId", "kelasId"] },
      include: [
        {
          model: Guru,
          as: "guru",
        },
        {
          model: Kelas,
          as: "kelas",
          include: {
            model: Siswa,
            as: "siswa",
            attributes: { exclude: ["kelasId", "userId"] },
            include: [
              {
                model: NilaiUas,
                as: "nilaiUas",
                attributes: { exclude: ["kelasId", "siswaId", "matpelId"] },
                include:{
                  model: Matpel,
                  as: "mataPelajaran",
                },
              },
              {
                model: NilaiUts,
                as: "nilaiUts",
                attributes: { exclude: ["kelasId", "siswaId", "matpelId"] },
                include:{
                  model: Matpel,
                  as: "mataPelajaran",
                },
              },
            ],
          },
        },
      ],
    });
    if (!wali) {
      return res
        .status(404)
        .json({ status: false, message: "tidak dapat menemukan wali kelas" });
    }
    return res.status(200).json({ satus: true, data: wali });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getWaliKelasBySiswa = async (req, res) => {
  try {
    const siswa = await Siswa.findOne({
      where: { userId: req.user.id },
    });
    if (!siswa) {
      return res
        .status(404)
        .json({ status: false, message: "tidak dapat menemukan siswa" });
    }

    const wali = await WaliKelas.findOne({
      where: { kelasId: siswa.kelasId },
      attributes: { exclude: ["guruId", "kelasId"] },
      include: [
        {
          model: Guru,
          as: "guru",
        },
      ],
    });
    if (!wali) {
      return res
        .status(404)
        .json({ status: false, message: "tidak dapat menemukan wali kelas" });
    }
    return res.status(200).json({ satus: true, data: wali });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getWaliKelasByWaliMurid = async (req, res) => {
  try {
    const wali_murid = await WaliMurid.findOne({
      where: { userId: req.user.id },
    });
    if (!wali_murid) {
      return res
        .status(404)
        .json({ status: false, message: "tidak dapat menemukan wali murid" });
    }

    const siswa = await Siswa.findOne({ id: wali_murid.siswaId });
    if (!siswa) {
      return res
        .status(404)
        .json({ status: false, message: "tidak dapat menemukan siswa" });
    }

    const wali = await WaliKelas.findOne({
      where: { kelasId: siswa.kelasId },
      attributes: { exclude: ["guruId", "kelasId"] },
      include: [
        {
          model: Guru,
          as: "guru",
        },
      ],
    });
    if (!wali) {
      return res
        .status(404)
        .json({ status: false, message: "tidak dapat menemukan wali kelas" });
    }
    return res.status(200).json({ satus: true, data: wali });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.createWaliKelas = async (req, res) => {
  try {
    const { kelasId, guruId } = req.body;
    if (!kelasId) {
      return res
        .status(400)
        .json({ status: false, message: "field 'kelasId' tidak boleh kosong" });
    } else if (!guruId) {
      return res
        .status(400)
        .json({ status: false, message: "field 'guruId' tidak boleh kosong" });
    }
    const wali = await WaliKelas.findOne({
      where: { guruId: guruId, kelasId: kelasId },
    });
    if (wali) {
      return res.status(400).json({
        status: false,
        message: "wali kelas sudah pernah di buat",
      });
    }
    const createWaliKelas = await WaliKelas.create({
      guruId: guruId,
      kelasId: kelasId,
    });
    return res.status(201).json({
      status: true,
      message: "berhasil membuat wali kelas",
      data: createWaliKelas,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateWaliKelas = async (req, res) => {
  try {
    const { kelasId, guruId } = req.body;
    const { id: waliKelasId } = req.params;
    if (!kelasId) {
      return res
        .status(400)
        .json({ status: false, message: "field 'kelasId' tidak boleh kosong" });
    } else if (!guruId) {
      return res
        .status(400)
        .json({ status: false, message: "field 'guruId' tidak boleh kosong" });
    }
    const wali = await WaliKelas.findByPk(waliKelasId);
    if (!wali) {
      return res.status(400).json({
        status: false,
        message: "tidak dapat menemukan wali kelas",
      });
    }
    await wali.update({
      guruId: guruId,
      kelasId: kelasId,
    });
    return res.status(201).json({
      status: true,
      message: "berhasil mengubah wali kelas",
      data: wali,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteWaliKelas = async (req, res) => {
  try {
    const waliKelasId = req.params.id;
    if (!waliKelasId) {
      return res
        .status(400)
        .json({ status: false, message: "Query 'id' tidak boleh kosong" });
    }

    if (req.user.hakAkses !== "admin") {
      return res
        .status(403)
        .json({ status: false, message: "kamu tidak memiliki akses" });
    }

    const wali = await WaliKelas.findOne({ where: { id: waliKelasId } });
    if (!wali) {
      return res.status(404).json({
        status: false,
        message: "Wali Kelas tidak ditemukan",
      });
    }

    await wali.destroy();

    return res
      .status(200)
      .json({ status: true, message: "Wali Kelas Berhasil Di Hapus" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
