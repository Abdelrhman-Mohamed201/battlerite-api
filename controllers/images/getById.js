const Images = require("../../models/images");
const handler = require("../../services/handler");
require("dotenv").config();

module.exports = (req, res) => {
    Images.findById(req.params.imageId).exec()
        .then(docs => {
            const response = {
                status: 200,
                collection: {
                    _id: docs._id,
                    fieldname: docs.fieldname,
                    originalname: docs.originalname,
                    encoding: docs.encoding,
                    mimetype: docs.mimetype,
                    destination: docs.destination,
                    filename: docs.filename,
                    path: docs.path,
                    size: docs.size,
                    request: {
                        type: "GET",
                        description: "Get all images",
                        url: `${process.env.URL}/images/g`
                    }
                }
            };
            res.status(200).json(response)
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500
            });
        })
};