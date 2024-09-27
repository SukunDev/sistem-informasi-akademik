const router = require("express").Router();
const waliMuridController = require("../controllers/waliMuridController");
const nilaiUtsController = require("../controllers/nilaiUtsController");
const nilaiUasController = require("../controllers/nilaiUasController");
const absenController = require("../controllers/absenController");
const jadwalPelajaranController = require("../controllers/jadwalPelajaranController");

router.get("/profile", waliMuridController.getWaliMuridProfile);
router.post("/profile", waliMuridController.createWaliMuridProfile);
router.post("/profile/update", waliMuridController.updateWaliMuridProfile);

router.get("/nilai-uts", nilaiUtsController.getSiswaNilaiUts);

router.get("/nilai-uas", nilaiUasController.getSiswaNilaiUas);

router.get("/absensi", absenController.getSiswaAbsen);

router.get("/jadwal-pelajaran", jadwalPelajaranController.getJadwalPelajaran);

module.exports = router;
