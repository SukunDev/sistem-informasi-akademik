const kelasController = require("../controllers/kelasController");
const adminController = require("../controllers/adminController");
const mataPelajaranController = require("../controllers/mataPelajaranController");
const jadwalPelajaranController = require("../controllers/jadwalPelajaranController");
const siswaController = require("../controllers/siswaController");
const guruController = require("../controllers/guruController");
const waliMuridController = require("../controllers/waliMuridController");
const absenController = require("../controllers/absenController");

const router = require("express").Router();

router.get("/profile", adminController.getAdminProfile);
router.post("/profile", adminController.createAdminProfile);
router.post("/profile/update", adminController.updateAdminProfile);

router.get("/siswa", siswaController.getSiswa);
router.post("/siswa", siswaController.createSiswaProfile);
router.post("/siswa/:id", siswaController.updateSiswaProfile);
router.delete("/siswa/:id", siswaController.deleteSiswa);

router.get("/guru", guruController.getGuru);
router.post("/guru", guruController.createGuruProfile);
router.post("/guru/:id", guruController.updateGuruProfile);
router.delete("/guru/:id", guruController.deleteGuru);

router.get("/wali-murid", waliMuridController.getWaliMurid);
router.post("/wali-murid", waliMuridController.createWaliMuridProfile);
router.post("/wali-murid/:id", waliMuridController.updateWaliMuridProfile);
router.delete("/wali-murid/:id", waliMuridController.deleteWaliMurid);

router.get("/kelas", kelasController.getKelas);
router.post("/kelas", kelasController.createKelas);
router.post("/kelas/:id", kelasController.updateKelas);
router.delete("/kelas/:id", kelasController.deleteKelas);

router.get("/matpel", mataPelajaranController.getMatpel);
router.post("/matpel", mataPelajaranController.createMatpel);
router.post("/matpel/:id", mataPelajaranController.updateMatpel);
router.delete("/matpel/:id", mataPelajaranController.deleteMatpel);

router.get("/jadwal-pelajaran", jadwalPelajaranController.getJadwalPelajaran);
router.post(
  "/jadwal-pelajaran",
  jadwalPelajaranController.createJadwalPelajaran
);
router.post(
  "/jadwal-pelajaran/:id",
  jadwalPelajaranController.updateJadwalPelajaran
);
router.delete(
  "/jadwal-pelajaran/:id",
  jadwalPelajaranController.deleteJadwalPelajaran
);

router.get("/absensi", absenController.getAbsen);
router.post("/absensi", absenController.createAbsen);
router.post("/absensi/:id", absenController.updateAbsen);
router.delete("/absensi/:id", absenController.deleteAbsen);

module.exports = router;
