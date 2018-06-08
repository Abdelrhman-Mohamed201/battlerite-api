require('dotenv').config()
const News = require("../../models/news")

all = (req, res, next) => {
    News.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                collection: docs.map(news => {
                    return {
                        _id: news._id,
                        premalink: news.premalink,
                        subTitle: news.subTitle,
                        created_at: news.created_at,
                        updated_at: news.updated_at,
                        content: news.content,
                        title: news.title,
                        img: {
                            id: news.imgId,
                            path: news.imgPath,
                        },
                        request: {
                            type: 'GET',
                            url: `${process.env.URL}/news/${news._id}`
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
}

module.exports = all