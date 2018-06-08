const mongoose = require("mongoose")
const fs = require('fs')
require('dotenv').config()

const News = require("../../models/news")
const Images = require("../../models/images")

create = (req, res, next) => {
    const imageId = mongoose.Types.ObjectId()
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
    })

    /** Save image **/
    image
        .save()
        .then(img => {
            /** Rename the image file **/
            fs.rename(`${image.destination}/${image.originalname}`, image.path, err => {
                if (err) res.status(500).json({
                    status: 500,
                    error: err
                })
            })
            /** End:Rename the image file **/
            const news = new News({
                _id: mongoose.Types.ObjectId(),
                premalink: req.body.premalink,
                subTitle: req.body.subTitle,
                content: req.body.content,
                imgPath: img.path,
                imgId: img._id,
                title: req.body.title,
            })
            /** Save news **/
            news
                .save()
                .then(docs => {
                    const response = {
                        status: 201,
                        message: 'Created news successfully',
                        collection: {
                            _id: docs._id,
                            premalink: docs.premalink,
                            subTitle: docs.subTitle,
                            content: docs.content,
                            title: docs.title,
                            img: {
                                id: docs.imgId,
                                path: docs.imgPath,
                            },
                            request: {
                                type: 'GET',
                                url: `${process.env.URL}/news/${docs._id}`
                            }
                        },
                    }
                    res.status(201).json(response)
                })
                .catch(err => {
                    res.status(500).json({
                        status: 500,
                        error: err
                    })
                })
            /** End:Save news **/
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        })
    /** End:Save image **/
}

module.exports = create