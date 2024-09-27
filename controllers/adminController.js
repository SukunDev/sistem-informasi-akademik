const Admin = require("../models/adminModel");
const User = require("../models/userModel");

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
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
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
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
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
    return res
      .status(500)
      .json({ status: false, message: "terjadi kesalahan pada server" });
  }
};
