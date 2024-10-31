const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");
const Siswa = require("./siswaModel");
const Guru = require("./guruModel");
const WaliMurid = require("./waliMuridModel");
const Admin = require("./adminModel");
const { ROLE } = require("../config/role");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hakAkses: {
      type: DataTypes.ENUM(ROLE),
      allowNull: false,
      defaultValue: "siswa",
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Siswa, { foreignKey: "userId", as: "user" });
Siswa.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Guru, { foreignKey: "userId" });
Guru.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(WaliMurid, { foreignKey: "userId" });
WaliMurid.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Admin, { foreignKey: "userId" });
Admin.belongsTo(User, { foreignKey: "userId", as: "user" });

User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
