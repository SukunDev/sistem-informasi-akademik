const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error("Hanya gambar dengan format JPEG atau PNG yang diperbolehkan!"),
      false
    );
  }
};

const maxFileSize = 10; // maksud nya membatasi file menjadi 10MB saja

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * maxFileSize },
  fileFilter: fileFilter,
});

module.exports = upload;
