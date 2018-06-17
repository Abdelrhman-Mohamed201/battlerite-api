const fs = require("fs");
require("dotenv").config();
const handler = require("../../services/handler");
const News = require("../../models/news");
const Images = require("../../models/images");

module.exports = (req, res) => {
    const id = req.params.newsId;
    News.findById(id).select("imgId").exec()
        .then(docsImgId => {
            News.remove({_id: id}).exec()
                .then(newsDocs => {
                    if (!newsDocs.n) {
                        handler({
                            req, res,
                            status: 404,
                            kind: "News not found."
                        });
                    } else {
                        Images.remove().exec()
                            .then(imagesDocs => {
                                if (!imagesDocs.n) {
                                    handler({
                                        req, res,
                                        status: 404,
                                        kind: "Image not found."
                                    });
                                } else {
                                    /** Remove the image file **/
                                    fs.unlinkSync(`${process.env.UPLOAD_IMAGES_NEWS}/${docsImgId.imgId}.jpg`, (err) => {
                                        if (err) {
                                            handler({
                                                req, res,
                                                error: err,
                                                status: 500,
                                                kind: "Image not found."
                                            });
                                        }
                                    });
                                    /** End:Remove the image file **/
                                    const reponse = {
                                        status: 200,
                                        message: "News deleted.",
                                        request: {
                                            type: "GET",
                                            url: `${process.env.URL}/news/g`
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
                                    kind: "Can't remove the image."
                                });
                            })
                    }
                })
                .catch(err => {
                    handler({
                        req, res,
                        error: err,
                        status: 500,
                        kind: "Can't remove the news."
                    });
                })
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the news."
            });
        })

};