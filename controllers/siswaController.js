const AbsenSiswa = require("../models/absenSiswaModel");
const Kelas = require("../models/kelasModel");
const NilaiUas = require("../models/nilaiUasModel");
const NilaiUts = require("../models/nilaiUtsModel");
const Siswa = require("../models/siswaModel");
const User = require("../models/userModel");
const WaliMurid = require("../models/waliMuridModel");

exports.getSiswa = async (req, res) => {
  try {
    const siswa = await Siswa.findAll({
      attributes: { exclude: ["kelasId", "userId"] },
      include: [
        {
          model: Kelas,
          as: "kelas",
        },
      ],
    });
    return res.status(200).json({ satus: true, data: siswa });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getSiswaSingle = async (req, res) => {
  try {
    const siswaId = req.params.id;
    const siswa = await Siswa.findOne({
      where: { id: siswaId },
      attributes: { exclude: ["kelasId", "userId"] },
      include: [
        {
          model: Kelas,
          as: "kelas",
        },
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    if (!siswa) {
      return res
        .status(400)
        .json({ status: false, message: "tidak dapat menemukan siswa" });
    }
    return res.status(200).json({ satus: true, data: siswa });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getSiswaProfile = async (req, res) => {
  try {
    const user = req.user;
    const siswa = await Siswa.findOne({
      where: { userId: user.id },
      attributes: { exclude: ["kelasId", "userId"] },
      include: [
        {
          model: Kelas,
          as: "kelas",
        },
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    if (!siswa) {
      return res
        .status(400)
        .json({ status: false, message: "siswa belum membuat profile" });
    }
    return res.status(200).json({ satus: true, data: siswa });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.createSiswaProfile = async (req, res) => {
  try {
    const {
      nis,
      semester,
      nama,
      ttl,
      jk,
      agama,
      noTelp,
      alamat,
      foto,
      kelasId,
    } = req.body;
    if (!nis) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nis' tidak boleh kosong" });
    } else if (!nama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nama' tidak boleh kosong" });
    } else if (!semester) {
      return res.status(400).json({
        status: false,
        message: "field 'semester' tidak boleh kosong",
      });
    } else if (!ttl) {
      return res
        .status(400)
        .json({ status: false, message: "field 'ttl' tidak boleh kosong" });
    } else if (!jk) {
      return res
        .status(400)
        .json({ status: false, message: "field 'jk' tidak boleh kosong" });
    } else if (!agama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'agama' tidak boleh kosong" });
    } else if (!noTelp) {
      return res
        .status(400)
        .json({ status: false, message: "field 'noTelp' tidak boleh kosong" });
    } else if (!alamat) {
      return res
        .status(400)
        .json({ status: false, message: "field 'alamat' tidak boleh kosong" });
    } else if (!foto) {
      return res
        .status(400)
        .json({ status: false, message: "field 'foto' tidak boleh kosong" });
    } else if (!kelasId) {
      return res
        .status(400)
        .json({ status: false, message: "field 'kelasId' tidak boleh kosong" });
    }
    const user = req.user;
    let userId;
    if (user.hakAkses == "siswa") {
      userId = user.id;
    } else if (user.hakAkses == "admin") {
      const { username, password } = req.body;
      if (!username) {
        return res.status(400).json({
          status: false,
          message: "field 'username' tidak boleh kosong",
        });
      } else if (!password) {
        return res.status(400).json({
          status: false,
          message: "field 'password' tidak boleh kosong",
        });
      }
      const checkUser = await User.findOne({ where: { username: username } });
      if (checkUser) {
        return res.status(400).json({
          status: false,
          message: "username telah di gunakan",
        });
      }
      const user = await User.create({
        username: username,
        password: password,
        hakAkses: "siswa",
      });
      userId = user.id;
    } else {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }
    const siswa = await Siswa.findOne({ where: { userId: userId } });
    if (siswa) {
      return res.status(400).json({
        status: false,
        message: "profile siswa sudah pernah di buat",
      });
    }
    const createSiswa = await Siswa.create({
      userId: userId,
      nis: nis,
      kelasId: kelasId,
      semester: semester,
      nama: nama,
      ttl: ttl,
      jk: jk,
      agama: agama,
      noTelp: noTelp,
      alamat: alamat,
      foto: foto,
    });
    return res.status(201).json({
      status: true,
      message: "berhasil membuat profile siswa",
      data: createSiswa,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateSiswaProfile = async (req, res) => {
  try {
    const {
      nis,
      semester,
      nama,
      ttl,
      jk,
      agama,
      noTelp,
      alamat,
      foto,
      kelasId,
    } = req.body;
    if (!nis) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nis' tidak boleh kosong" });
    } else if (!nama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nama' tidak boleh kosong" });
    } else if (!semester) {
      return res.status(400).json({
        status: false,
        message: "field 'semester' tidak boleh kosong",
      });
    } else if (!ttl) {
      return res
        .status(400)
        .json({ status: false, message: "field 'ttl' tidak boleh kosong" });
    } else if (!jk) {
      return res
        .status(400)
        .json({ status: false, message: "field 'jk' tidak boleh kosong" });
    } else if (!agama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'agama' tidak boleh kosong" });
    } else if (!noTelp) {
      return res
        .status(400)
        .json({ status: false, message: "field 'noTelp' tidak boleh kosong" });
    } else if (!alamat) {
      return res
        .status(400)
        .json({ status: false, message: "field 'alamat' tidak boleh kosong" });
    } else if (!foto) {
      return res
        .status(400)
        .json({ status: false, message: "field 'foto' tidak boleh kosong" });
    } else if (!kelasId) {
      return res
        .status(400)
        .json({ status: false, message: "field 'kelasId' tidak boleh kosong" });
    }
    const user = req.user;
    let userId;
    if (user.hakAkses == "siswa") {
      userId = user.id;
    } else if (user.hakAkses == "admin") {
      const queryId = req.params.id;
      if (!queryId) {
        return res
          .status(400)
          .json({ status: false, message: "Query 'id' tidak boleh kosong" });
      }
      const user = await User.findOne({ where: { id: queryId } });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "tidak dapat menemukan user" });
      }
      userId = user.id;
    } else {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }
    const siswa = await Siswa.findOne({ where: { userId: userId } });
    if (!siswa) {
      return res.status(400).json({
        status: false,
        message: "profile siswa tidak di temukan",
      });
    }
    const updateSiswa = await siswa.update({
      kelasId: kelasId,
      nis: nis,
      semester: semester,
      nama: nama,
      ttl: ttl,
      jk: jk,
      agama: agama,
      noTelp: noTelp,
      alamat: alamat,
      foto: foto,
    });
    return res.status(200).json({
      status: true,
      message: "berhasil mengubah profile siswa",
      data: updateSiswa,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteSiswa = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(400)
        .json({ status: false, message: "Query 'id' tidak boleh kosong" });
    }

    if (req.user.hakAkses !== "admin") {
      return res
        .status(403)
        .json({ status: false, message: "kamu tidak memiliki akses" });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User tidak ditemukan",
      });
    }

    const userProfile = await Siswa.findOne({
      where: { userId: userId },
      include: [{ model: WaliMurid }],
    });

    if (userProfile) {
      const waliMurid = await userProfile.getWaliMurid();
      if (waliMurid) {
        await waliMurid.update({ siswaId: null });
      }
      await NilaiUas.destroy({ where: { siswaId: userProfile.id } });
      await NilaiUts.destroy({ where: { siswaId: userProfile.id } });
      await AbsenSiswa.destroy({ where: { siswaId: userProfile.id } });
      console.log(userProfile);

      await userProfile.destroy();
    }
    await user.destroy();

    return res
      .status(200)
      .json({ status: true, message: "User dan profil berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
