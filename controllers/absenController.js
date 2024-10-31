const AbsenSiswa = require("../models/absenSiswaModel");
const Kelas = require("../models/kelasModel");
const Siswa = require("../models/siswaModel");
const User = require("../models/userModel");
const WaliMurid = require("../models/waliMuridModel");
const helper = require("../utils/helper");

exports.getAbsen = async (req, res) => {
  try {
    const absen = await AbsenSiswa.findAll({
      attributes: { exclude: ["siswaId", "kelasId"] },
      include: [
        { model: Siswa, as: "siswa" },
        { model: Kelas, as: "kelas" },
      ],
    });
    return res.status(200).json({ satus: true, data: absen });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getSiswaAbsen = async (req, res) => {
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
    const absen = await AbsenSiswa.findAll({
      where: { siswaId: siswaId },
      attributes: { exclude: ["siswaId", "kelasId"] },
      include: [
        { model: Siswa, as: "siswa" },
        { model: Kelas, as: "kelas" },
      ],
    });
    return res.status(200).json({ satus: true, data: absen });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.createAbsen = async (req, res) => {
  try {
    const user = req.user;
    let userId;
    if (user.hakAkses == "siswa") {
      userId = user.id;
    } else if (user.hakAkses == "admin") {
      const { siswaId: id } = req.body;
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "field 'userId' tidak boleh kosong",
        });
      }
      const siswa = await Siswa.findOne({ where: { id: id } });
      if (!siswa) {
        return res
          .status(400)
          .json({ status: false, message: "siswa tidak di temukan" });
      }
      userId = siswa.userId;
    }
    const { keterangan } = req.body;
    if (!keterangan) {
      return res.status(400).json({
        status: false,
        message: "field 'keterangan' tidak boleh kosong",
      });
    }
    const siswa = await Siswa.findOne({
      where: {
        userId: userId,
      },
    });
    if (!siswa) {
      return res.status(400).json({
        status: false,
        message: "siswa tidak di temukan",
      });
    }
    const date = helper.getDate();
    const day = helper.getDay();
    const checkAbsen = await AbsenSiswa.findAll({
      where: { siswaId: siswa.id, tglAbsen: date },
    });

    if (checkAbsen.length > 0) {
      return res.status(400).json({
        status: false,
        message: "kamu telah melakukan absensi pada hari ini",
      });
    }

    const absen = await AbsenSiswa.create({
      siswaId: siswa.id,
      kelasId: siswa.kelasId,
      semester: siswa.semester,
      tglAbsen: date,
      hariAbsen: day,
      keterangan: keterangan,
    });
    return res.status(201).json({
      status: true,
      message: "berhasil melakukan absensi",
      data: absen,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateAbsen = async (req, res) => {
  try {
    const user = req.user;
    if (user.hakAkses != "admin") {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }
    const { keterangan } = req.body;
    const absenId = req.params.id;
    if (!keterangan) {
      return res.status(400).json({
        status: false,
        message: "field 'keterangan' tidak boleh kosong",
      });
    }
    if (!absenId) {
      return res.status(400).json({
        status: false,
        message: "query 'id' tidak boleh kosong",
      });
    }
    const absen = await AbsenSiswa.findOne({ where: { id: absenId } });

    if (!absen) {
      return res.status(400).json({
        status: false,
        message: "tidak dapat menemukan absen",
      });
    }
    const date = helper.getDate();
    const day = helper.getDay();

    await absen.update({
      tglAbsen: date,
      hariAbsen: day,
      keterangan: keterangan,
    });
    return res.status(201).json({
      status: true,
      message: "berhasil melakukan mengubah",
      data: absen,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteAbsen = async (req, res) => {
  try {
    const absenId = req.params.id;
    const user = req.user;
    if (user.hakAkses !== "admin") {
      return res
        .status(400)
        .json({ status: false, message: "kamu tidak memiliki akses" });
    }
    const absen = await AbsenSiswa.findOne({ where: { id: absenId } });
    if (!absen) {
      return res.status(400).json({
        status: false,
        message: "absen tidak di temukan",
      });
    }
    absen.destroy();
    return res
      .status(201)
      .json({ satus: true, message: "absen berhasil di hapus" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
