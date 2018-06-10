const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/news")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const uploadImage = multer({
    storage, fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 3 // limit 3 mega
    }
});

module.exports = uploadImage;