const Images = require("../../models/images");
const handler = require("../../services/handler");
require("dotenv").config();

module.exports = (req, res) => {
    Images.findById(req.params.imageId).exec()
        .then(docs => {
            const response = {
                status: 200,
                collection: docs,
                request: {
                    type: "GET",
                    description: "Get all images",
                    url: `${process.env.URL}/images/g`
                }
            };
            res.status(response.status).json(response);
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find that image."
            });
        })
};