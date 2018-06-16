require("dotenv").config();
const handler = require("../../services/handler");
const News = require("../../models/news");

module.exports = (req, res) => {
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
                        createdAt: news.createdAt,
                        updatedAt: news.updatedAt,
                        content: news.content,
                        title: news.title,
                        img: {
                            id: news.imgId,
                            path: news.imgPath,
                        },
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/news/g/${news._id}`
                        }
                    }
                }),
            };
            res.status(200).json(response)
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