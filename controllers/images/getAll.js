const Images = require("../../models/images");
const handler = require("../../services/handler");
require("dotenv").config();

module.exports = (req, res) => {
    Images.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                collection: docs.map(image => {
                    return {
                        _id: image._id,
                        originalname: image.originalname,
                        path: image.path,
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/images/g/${image._id}`
                        }
                    }
                }),
            };
            res.status(200).json(response)
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Getting images."
            });
        })
};