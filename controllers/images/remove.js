const fs = require("fs");
require("dotenv").config();
const Images = require("../../models/images");

module.exports = (req, res) => {
    const id = req.params.imageId;
    Images.remove().exec()
        .then(docs => {
            const request = {
                type: "GET",
                url: `${process.env.URL}/images/g`,
            };
            if (!docs.n) {
                res.status(404).json({
                    status: 404,
                    message: 'Image not found',
                    request,
                })
            } else {
                /** Remove the image file **/
                fs.unlinkSync(`uploads/news/${id}.jpg`, (err) => {
                    if (err) res.status(500).json({
                        status: 500,
                        error: err
                    })
                });
                /** End:Remove the image file **/
                res.status(200).json({
                    status: 200,
                    message: "Image deleted",
                    request,
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        })
};