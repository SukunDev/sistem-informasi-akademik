const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const authMiddleware = require("./middleware/authMiddleware");
const multerMiddleware = require("./middleware/mutlerMiddleware");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const siswaRoutes = require("./routes/siswaRoutes");
const guruRoutes = require("./routes/guruRoutes");
const waliMuridRoutes = require("./routes/waliMuridRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/uploads", multerMiddleware.single("foto"), uploadRoutes);
app.use("/api/admin", authMiddleware, adminRoutes);
app.use("/api/siswa", authMiddleware, siswaRoutes);
app.use("/api/guru", authMiddleware, guruRoutes);
app.use("/api/wali-murid", authMiddleware, waliMuridRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server berjalan di port 3000");
    });
  })
  .catch((err) => {
    console.log("Gagal sync database:", err);
  });
