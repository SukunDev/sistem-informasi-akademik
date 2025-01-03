const router = require("express").Router();
const guruController = require("../controllers/guruController");
const nilaiUtsController = require("../controllers/nilaiUtsController");
const nilaiUasController = require("../controllers/nilaiUasController");
const jadwalPelajaranController = require("../controllers/jadwalPelajaranController");
const siswaController = require("../controllers/siswaController");
const kelasController = require("../controllers/kelasController");
const waliKelasController = require("../controllers/waliKelasController");
const absenController = require("../controllers/absenController");

router.get("/jadwal-mengajar", jadwalPelajaranController.getJadwalGuru);

router.get("/profile", guruController.getGuruProfile);
router.post("/profile", guruController.createGuruProfile);
router.post("/profile/update", guruController.updateGuruProfile);

router.get("/nilai-uts", nilaiUtsController.getNilaiUts);
router.post("/nilai-uts", nilaiUtsController.createNilaiUts);
router.post("/nilai-uts/:id", nilaiUtsController.updateNilaiUts);
router.delete("/nilai-uts/:id", nilaiUtsController.deleteNilaiUts);

router.get("/nilai-uas", nilaiUasController.getNilaiUas);
router.post("/nilai-uas", nilaiUasController.createNilaiUas);
router.post("/nilai-uas/:id", nilaiUasController.updateNilaiUas);
router.delete("/nilai-uas/:id", nilaiUasController.deleteNilaiUas);

router.get("/siswa", siswaController.getSiswa);
router.get("/siswa/:id", siswaController.getSiswaSingle);

router.get("/kelas", kelasController.getKelasByGuru);
router.get("/kelas/:kelasId", kelasController.getSingleKelasByGuru);
router.get(
  "/kelas/:kelasId/:mataPelajaran",
  kelasController.getSingleKelasMapelByGuru
);

router.get("/wali-kelas", waliKelasController.getWaliKelasByGuru);

router.get("/wali-kelas/absensi", absenController.getAbsenByWaliKelas);
router.post("/wali-kelas/absensi", absenController.createAbsen);
router.post("/wali-kelas/absensi/:id", absenController.updateAbsen);
router.delete("/wali-kelas/absensi/:id", absenController.deleteAbsen);

module.exports = router;
