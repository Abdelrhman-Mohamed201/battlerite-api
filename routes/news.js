const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require('dotenv').config()

const News = require("../models/news")

router.get('/', (req, res, next) => {
    News.find().select('_id title created_at').exec()
        .then(docs => {
            const response = {
                count: docs.length,
                news: docs.map(news => {
                    return {
                        _id: news._id,
                        premalink: news.premalink,
                        subTitle: news.subTitle,
                        created_at: news.created_at,
                        content: news.content,
                        title: news.title,
                        request: {
                            type: 'GET',
                            url: `${process.env.URL}/news/${news._id}`
                        }
                    }
                }),
                status: 200
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
})

router.post('/', (req, res, next) => {
    const news = new News({
        _id: mongoose.Types.ObjectId(),
        premalink: req.body.premalink,
        subTitle: req.body.subTitle,
        content: req.body.content,
        title: req.body.title,
    })

    news
        .save()
        .then(docs => {
            const response = {
                message: 'Created news successfully',
                news: {
                    _id: docs._id,
                    premalink: docs.premalink,
                    subTitle: docs.subTitle,
                    content: docs.content,
                    title: docs.title,
                    request: {
                        type: 'GET',
                        url: `${process.env.URL}/news/${docs._id}`
                    }
                },
                status: 201
            }
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
})

router.get('/:newsId', (req, res, next) => {
    News.findById(req.params.newsId)
        .select('_id created_at premalink subTitle content title').exec()
        .then(docs => {
            const response = {
                news: {
                    _id: docs._id,
                    premalink: docs.premalink,
                    subTitle: docs.subTitle,
                    content: docs.content,
                    title: docs.title,
                    created_at: docs.created_at,
                    request: {
                        type: 'GET',
                        description: 'Get all products',
                        url: `${process.env.URL}/news`
                    }
                },
                status: 200
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
})

router.patch('/:newsId', (req, res, next) => {
    const id = req.params.newsId
    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    News.update({_id: id}, {$set: updateOps}).exec()
        .then(docs => {
            const reponse = {
                message: 'News updated',
                request: {
                    type: 'GET',
                    url: `${process.env.URL}/news/${id}`
                },
                status: 200
            }
            res.status(200).json(reponse)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
})

router.delete('/:newsId', (req, res, next) => {
    const id = req.params.newsId;
    News.remove({_id: id}).exec()
        .then(docs => {
            const request = {
                type: 'GET',
                url: `${process.env.URL}/news`,
            }
            if (docs) {
                res.status(404).json({
                    message: 'Not found',
                    request,
                    status: 404
                })
            } else {
                res.status(200).json({
                    message: 'News deleted',
                    request,
                    status: 200
                })
            }
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
});

module.exports = router