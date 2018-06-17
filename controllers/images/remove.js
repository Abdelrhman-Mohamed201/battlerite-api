const fs = require("fs");
require("dotenv").config();
const Images = require("../../models/images");

module.exports = (req, res) => {
    const id = req.params.imageId;
    Images.remove().exec()
        .then(docs => {
            if (!docs.n) {
                handler({
                    req, res,
                    status: 404,
                    kind: "Image not found."
                });
            } else {
                /** Remove the image file **/
                fs.unlinkSync(`uploads/news/${id}.jpg`, (err) => {
                    if (err) handler({
                        req, res,
                        status: 500,
                        kind: "Can't remove the image."
                    });
                });
                /** End:Remove the image file **/
                const reponse = {
                    status: 200,
                    message: "Image deleted.",
                    request: {
                        type: "GET",
                        url: `${process.env.URL}/images/g`
                    }
                };
                res.status(reponse.status).json(reponse);
            }
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "can't find the image."
            });
        });
};