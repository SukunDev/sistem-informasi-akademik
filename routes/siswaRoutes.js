const router = require("express").Router();
const siswaController = require("../controllers/siswaController");
const absenController = require("../controllers/absenController");
const nilaiUtsController = require("../controllers/nilaiUtsController");
const nilaiUasController = require("../controllers/nilaiUasController");
const guruController = require("../controllers/guruController");
const jadwalPelajaranController = require("../controllers/jadwalPelajaranController");

router.get("/profile", siswaController.getSiswaProfile);
router.post("/profile", siswaController.createSiswaProfile);
router.post("/profile/update", siswaController.updateSiswaProfile);

router.get("/absensi", absenController.getSiswaAbsen);
router.post("/absensi", absenController.createAbsen);

router.get("/nilai-uts", nilaiUtsController.getSiswaNilaiUts);

router.get("/nilai-uas", nilaiUasController.getSiswaNilaiUas);

router.get("/daftar-guru", guruController.getGuru);

router.get(
  "/jadwal-pelajaran",
  jadwalPelajaranController.getJadwalPelajaranSiswa
);

module.exports = router;
