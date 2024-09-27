const router = require("express").Router();
const uploadController = require("../controllers/uploadController");

router.post("/", uploadController.uploadImage);
router.delete("/:fileName", uploadController.deleteImage);

module.exports = router;
