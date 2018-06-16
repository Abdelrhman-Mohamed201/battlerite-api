const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
const handler = require("../../services/handler");

const News = require("../../models/news");
const Images = require("../../models/images");
const Tokens = require("../../models/tokens");

module.exports = (req, res) => {
    const imageId = mongoose.Types.ObjectId();
    const image = new Images({
        _id: imageId,
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        path: `${req.file.destination.split('./')[1]}/${imageId}.${req.file.originalname.split('.')[1]}`,
        size: req.file.size,
    });

    /** Save image **/
    image
        .save()
        .then(img => {
            /** Rename the image file **/
            fs.rename(`${image.destination}/${image.originalname}`, image.path, err => {
                if (err) handler({
                    error: err,
                    status: 500,
                    kind: "Can't replace image name to image id."
                });
            });
            /** End:Rename the image file **/
            Tokens.findOne(req.body.token).exec()
                .then(token => {
                    const news = new News({
                        _id: mongoose.Types.ObjectId(),
                        author: token.userId,
                        premalink: req.body.premalink,
                        subTitle: req.body.subTitle,
                        content: req.body.content,
                        imgPath: img.path,
                        imgId: img._id,
                        title: req.body.title,
                    });
                    /** Save news **/
                    news
                        .save()
                        .then(docs => {
                            const response = {
                                status: 201,
                                message: "Created news successfully.",
                                collection: {
                                    _id: docs._id,
                                    author: docs.author,
                                    premalink: docs.premalink,
                                    subTitle: docs.subTitle,
                                    content: docs.content,
                                    title: docs.title,
                                    img: {
                                        id: docs.imgId,
                                        path: docs.imgPath,
                                    },
                                    request: {
                                        type: "GET",
                                        url: `${process.env.URL}/news/g/${docs._id}`
                                    }
                                },
                            };
                            res.status(201).json(response)
                        })
                        .catch(err => {
                            handler({
                                req, res,
                                error: err,
                                status: 500,
                                kind: "Can't save the news."
                            });
                        });
                    /** End:Save news **/
                })
                .catch(err => {
                    return handler({
                        req, res,
                        error: err,
                        status: 500,
                        kind: "Can't find the user id."
                    });
                });
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't save the image."
            });
        });
    /** End:Save image **/
};