const Images = require("../../models/images");
const handler = require("../../services/handler");
require("dotenv").config();

module.exports = (req, res) => {
    Images.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                ...docs.map(image => {
                    return {
                        collection: image,
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/images/g/${image._id}`
                        }
                    }
                })
            };
            res.status(response.status).json(response);
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