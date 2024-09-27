const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .json({ status: false, message: "invalid credentials" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], jwtConfig.secret);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "user tidak ditemukan" });
    }
    delete user["dataValues"]["password"];
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: false, message: "token tidak valid" });
  }
};
