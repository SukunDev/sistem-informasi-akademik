const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtConfig = require("../config/jwtConfig");
const { ROLE } = require("../config/role");

exports.login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!ROLE.includes(role)) {
      return res
        .status(400)
        .json({ status: false, message: "role tidak terdaftar" });
    }
    const user = await User.findOne({ where: { username, hakAkses: role } });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "user tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "password salah" });
    }
    if (user.hakAkses != role) {
      return res
        .status(400)
        .json({ status: false, message: "role tidak cocok" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.status(200).json({
      status: true,
      message: "login berhasil",
      data: {
        id: user.id,
        username: user.username,
        hakAkses: user.hakAkses,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username) {
      return res
        .status(400)
        .json({ status: false, message: "username tidak boleh kosong" });
    } else if (!password) {
      return res
        .status(400)
        .json({ status: false, message: "password tidak boleh kosong" });
    } else if (!role) {
      return res
        .status(400)
        .json({ status: false, message: "role tidak boleh kosong" });
    }
    if (!ROLE.includes(role)) {
      return res
        .status(400)
        .json({ status: false, message: "role tidak terdaftar" });
    }
    const checkUser = await User.findOne({ where: { username } });
    if (checkUser) {
      return res
        .status(400)
        .json({ status: false, message: "User telah terdaftar" });
    }
    const user = await User.create({
      username: username,
      password: password,
      hakAkses: role,
    });
    return res.status(201).json({
      status: true,
      message: "Success to create user",
      data: {
        id: user.id,
        username: user.username,
        hakAkses: user.hakAkses,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ where: { id: id } });
    const { oldPassword, password } = req.body;
    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "'oldPassword' salah" });
    }
    const salt = await bcrypt.genSalt(10);
    await user.update({ password: await bcrypt.hash(password, salt) });
    return res.status(200).json({
      status: true,
      message: "berhasil mengubah password",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
