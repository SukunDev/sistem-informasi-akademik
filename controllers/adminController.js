const Admin = require("../models/adminModel");
const User = require("../models/userModel");

exports.getAdmins = async (req, res) => {
  try {
    const admin = await Admin.findAll({
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    return res.status(200).json({ satus: true, data: admin });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const user = req.user;
    const admin = await Admin.findOne({
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
    if (!admin) {
      return res
        .status(400)
        .json({ status: false, message: "admin belum membuat profile" });
    }
    return res.status(200).json({ satus: true, data: admin });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.createAdminProfile = async (req, res) => {
  try {
    const { nama, ttl, jk, agama, noTelp, alamat, foto } = req.body;
    if (!nama) {
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

    const user = req.user;
    if (user.hakAkses != "admin") {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }
    const admin = await Admin.findOne({ where: { userId: user.id } });
    if (admin) {
      return res.status(400).json({
        status: false,
        message: "profile admin sudah pernah di buat",
      });
    }
    const createAdmin = await Admin.create({
      userId: user.id,
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
      message: "berhasil membuat profile admin",
      data: createAdmin,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateAdminProfile = async (req, res) => {
  try {
    const { nama, ttl, jk, agama, noTelp, alamat, foto } = req.body;
    if (!nama) {
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
    const user = req.user;
    if (user.hakAkses != "admin") {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }
    const admin = await Admin.findOne({ where: { userId: user.id } });
    if (!admin) {
      return res.status(400).json({
        status: false,
        message: "profile admin tidak di temukan",
      });
    }
    const updateAdmin = await admin.update({
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
      message: "berhasil mengubah profile admin",
      data: updateAdmin,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.adminCreateAdminProfile = async (req, res) => {
  try {
    let userId;
    const user = req.user;
    if (user.hakAkses == "admin") {
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
        hakAkses: "admin",
      });
      userId = user.id;
    } else {
      return res
        .status(400)
        .json({ status: false, message: "tidak memiliki akses" });
    }
    const { nama, ttl, jk, agama, noTelp, alamat, foto } = req.body;
    if (!nama) {
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
    const admin = await Admin.findOne({ where: { userId: userId } });
    if (admin) {
      return res.status(400).json({
        status: false,
        message: "profile admin sudah pernah di buat",
      });
    }
    const createAdmin = await Admin.create({
      userId: userId,
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
      message: "berhasil membuat admin",
      data: createAdmin,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.adminUpdateAdminProfile = async (req, res) => {
  try {
    let userId;
    const user = req.user;
    if (user.hakAkses == "admin") {
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
    const { nama, ttl, jk, agama, noTelp, alamat, foto } = req.body;
    if (!nama) {
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
    const admin = await Admin.findOne({ where: { userId: userId } });
    if (!admin) {
      return res.status(400).json({
        status: false,
        message: "profile admin tidak di temukan",
      });
    }
    const updateAdmin = await admin.update({
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
      message: "berhasil mengubah admin",
      data: updateAdmin,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.adminDeleteAdmin = async (req, res) => {
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

    const userProfile = await Admin.findOne({
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
