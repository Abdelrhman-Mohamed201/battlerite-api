const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const fs = require('fs')

require('dotenv').config()

const Images = require("../models/images")

router.get('/', (req, res, next) => {
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
                            type: 'GET',
                            url: `${process.env.URL}/images/${image._id}`
                        }
                    }
                }),
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        })
})

router.get('/g/:imageId', (req, res, next) => {
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
                        type: 'GET',
                        description: 'Get all images',
                        url: `${process.env.URL}/images`
                    }
                }
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        })
})

router.delete('/d/:imageId', (req, res, next) => {
    const id = req.params.imageId;
    Images.remove().exec()
        .then(docs => {
            const request = {
                type: 'GET',
                url: `${process.env.URL}/images`,
            }
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
                    message: 'Image deleted',
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
})

module.exports = router