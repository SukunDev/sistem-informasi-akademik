const Guru = require("../models/guruModel");
const Jadwal = require("../models/jadwalPelajaranModel");
const User = require("../models/userModel");

exports.getGuru = async (req, res) => {
  try {
    const guru = await Guru.findAll({
      attributes: { exclude: ["userId"] },
    });
    return res.status(200).json({ satus: true, data: guru });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getGuruProfile = async (req, res) => {
  try {
    const user = req.user;
    const guru = await Guru.findOne({
      where: { userId: user.id },
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    if (!guru) {
      return res
        .status(400)
        .json({ status: false, message: "guru belum membuat profile" });
    }
    return res.status(200).json({ satus: true, data: guru });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.createGuruProfile = async (req, res) => {
  try {
    const user = req.user;
    let userId;
    if (user.hakAkses == "guru") {
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
        hakAkses: "guru",
      });
      userId = user.id;
    } else {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }

    const { nig, nama, ttl, jk, agama, noTelp, alamat, foto } = req.body;
    if (!nig) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nig' tidak boleh kosong" });
    } else if (!nama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nama' tidak boleh kosong" });
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
    }

    const guru = await Guru.findOne({ where: { userId: userId } });
    if (guru) {
      return res.status(400).json({
        status: false,
        message: "profile guru sudah pernah di buat",
      });
    }
    const createGuru = await Guru.create({
      userId: userId,
      nig: nig,
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
      message: "berhasil membuat profile guru",
      data: createGuru,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateGuruProfile = async (req, res) => {
  try {
    const user = req.user;
    let userId;
    if (user.hakAkses == "guru") {
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

    const { nig, nama, ttl, jk, agama, noTelp, alamat, foto } = req.body;
    if (!nig) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nig' tidak boleh kosong" });
    } else if (!nama) {
      return res
        .status(400)
        .json({ status: false, message: "field 'nama' tidak boleh kosong" });
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
    }

    const guru = await Guru.findOne({ where: { userId: userId } });
    if (!guru) {
      return res.status(400).json({
        status: false,
        message: "profile guru tidak di temukan",
      });
    }
    const updateGuru = await guru.update({
      nig: nig,
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
      message: "berhasil mengubah profile guru",
      data: updateGuru,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteGuru = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(400)
        .json({ status: false, message: "Query 'id' tidak boleh kosong" });
    }
    if (req.user.hakAkses !== "admin") {
      return res
        .status(400)
        .json({ status: false, message: "kamu tidak memiliki akses" });
    }
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User tidak di temukan",
      });
    }
    const userProfile = await Guru.findOne({
      where: { userId: userId },
      include: [{ model: Jadwal }],
    });
    if (userProfile) {
      const jadwals = await userProfile.getJadwals();
      if (jadwals.length > 0) {
        jadwals.forEach(async (jadwal) => {
          await jadwal.update({ guruId: null });
        });
      }
      userProfile.destroy();
    }
    user.destroy();
    return res
      .status(200)
      .json({ satus: true, message: "user dan profile berhasil di hapus" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
