const fs = require("fs");
require("dotenv").config();
const News = require("../../models/news");
const Images = require("../../models/images");

const remove = (req, res, next) => {
    const id = req.params.newsId;
    News.findById(id).select("imgId").exec()
        .then(docsImgId => {
            News.remove({_id: id}).exec()
                .then(newsDocs => {
                    const request = {
                        type: "GET",
                        url: `${process.env.URL}/news/g`,
                    };
                    if (!newsDocs.n) {
                        res.status(404).json({
                            status: 404,
                            message: "Not found",
                            request,
                        })
                    } else {
                        Images.remove().exec()
                            .then(imagesDocs => {
                                if (!imagesDocs.n) {
                                    res.status(404).json({
                                        status: 404,
                                        message: "Image not found",
                                        request,
                                    })
                                } else {
                                    /** Remove the image file **/
                                    fs.unlinkSync(`uploads/news/${docsImgId.imgId}.jpg`, (err) => {
                                        if (err) res.status(500).json({
                                            status: 500,
                                            error: err
                                        })
                                    });
                                    /** End:Remove the image file **/
                                    res.status(200).json({
                                        status: 200,
                                        message: "News deleted",
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
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        status: 500,
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        })

};

module.exports = remove;