const fs = require("fs");
const path = require("path");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "File tidak boleh kosong" });
    }
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    return res.status(200).json({
      status: true,
      message: "Foto berhasil diupload",
      data: { foto: fileUrl },
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const fileName = req.params.fileName;
    if (!fileName) {
      return res.status(400).json({
        status: false,
        message: "query 'fileName' tidak boleh kosong",
      });
    }

    const filePath = path.join(__dirname, "../uploads", fileName);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res
          .status(404)
          .json({ status: false, message: "foto tidak ditemukan" });
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ status: false, message: "Gagal menghapus goto" });
        }

        return res
          .status(200)
          .json({ status: true, message: "foto berhasil dihapus" });
      });
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
