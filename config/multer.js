const multer = require("multer");

const storage = multer.diskStorage({
    /** Specify the saving path
     *
     * @param req request
     * @param file image file
     * @param cb call back function
     */
    destination: (req, file, cb) => {
        cb(null, "./uploads/news")
    },
    /** Specify the image name
     *
     * @param req request
     * @param file image file
     * @param cb call back function
     */
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

/** Filter the image to match jpeg or png extensions only
 *
 * @param req request
 * @param file image file
 * @param cb call back function
 */
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