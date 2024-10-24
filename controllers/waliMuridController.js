const Siswa = require("../models/siswaModel");
const User = require("../models/userModel");
const WaliMurid = require("../models/waliMuridModel");

exports.getWaliMurid = async (req, res) => {
  try {
    const wali = await WaliMurid.findAll({
      attributes: { exclude: ["userId", "siswaId"] },
      include: [
        {
          model: Siswa,
          as: "siswa",
        },
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    return res.status(200).json({ satus: true, data: wali });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getWaliMuridProfile = async (req, res) => {
  try {
    const user = req.user;
    const wali = await WaliMurid.findOne({
      where: { userId: user.id },
      attributes: { exclude: ["userId", "siswaId"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: Siswa,
          as: "siswa",
        },
      ],
    });
    if (!wali) {
      return res
        .status(400)
        .json({ status: false, message: "wali belum membuat profile" });
    }
    return res.status(200).json({ satus: true, data: wali });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.createWaliMuridProfile = async (req, res) => {
  try {
    const { nama, noTelp, alamat, ttl, email, siswaId } = req.body;
    if (!nama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nama' tidak boleh kosong" });
    } else if (!ttl) {
      return res
        .status(400)
        .json({ status: false, message: "field 'ttl' tidak boleh kosong" });
    } else if (!noTelp) {
      return res
        .status(400)
        .json({ status: false, message: "field 'noTelp' tidak boleh kosong" });
    } else if (!alamat) {
      return res
        .status(400)
        .json({ status: false, message: "field 'alamat' tidak boleh kosong" });
    } else if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "field 'email' tidak boleh kosong" });
    } else if (!siswaId) {
      return res
        .status(400)
        .json({ status: false, message: "field 'siswaId' tidak boleh kosong" });
    }
    const user = req.user;
    let userId;
    if (user.hakAkses == "wali murid") {
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
        hakAkses: "wali murid",
      });
      userId = user.id;
    } else {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }
    const wali = await WaliMurid.findOne({ where: { userId: userId } });
    if (wali) {
      return res.status(400).json({
        status: false,
        message: "profile wali sudah pernah di buat",
      });
    }
    const createWaliMurid = await WaliMurid.create({
      userId: userId,
      siswaId: siswaId,
      nama: nama,
      ttl: ttl,
      noTelp: noTelp,
      alamat: alamat,
      email: email,
    });
    return res.status(201).json({
      status: true,
      message: "berhasil membuat profile wali",
      data: createWaliMurid,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateWaliMuridProfile = async (req, res) => {
  try {
    const { nama, noTelp, alamat, ttl, email, siswaId } = req.body;
    if (!nama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nama' tidak boleh kosong" });
    } else if (!ttl) {
      return res
        .status(400)
        .json({ status: false, message: "field 'ttl' tidak boleh kosong" });
    } else if (!noTelp) {
      return res
        .status(400)
        .json({ status: false, message: "field 'noTelp' tidak boleh kosong" });
    } else if (!alamat) {
      return res
        .status(400)
        .json({ status: false, message: "field 'alamat' tidak boleh kosong" });
    } else if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "field 'email' tidak boleh kosong" });
    } else if (!siswaId) {
      return res
        .status(400)
        .json({ status: false, message: "field 'siswaId' tidak boleh kosong" });
    }
    const user = req.user;
    let userId;
    if (user.hakAkses == "wali murid") {
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
    const wali = await WaliMurid.findOne({ where: { userId: userId } });
    if (!wali) {
      return res.status(400).json({
        status: false,
        message: "profile wali tidak di temukan",
      });
    }
    const updateWaliMurid = await wali.update({
      siswaId: siswaId,
      nama: nama,
      noTelp: noTelp,
      ttl: ttl,
      alamat: alamat,
      email: email,
    });
    return res.status(200).json({
      status: true,
      message: "berhasil mengubah profile wali",
      data: updateWaliMurid,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteWaliMurid = async (req, res) => {
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

    const userProfile = await WaliMurid.findOne({
      where: { userId: userId },
    });

    if (userProfile) {
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
