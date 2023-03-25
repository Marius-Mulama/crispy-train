const multer = require("multer");
const storage = require("./storage");
const path = require("path");
const { response } = require("express");

const wrongfileResponse = response.status(400)

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(wrongfileResponse);
    }
    callback(null, true);
  },

});
uploader = upload.single("image");

module.exports = uploader;
