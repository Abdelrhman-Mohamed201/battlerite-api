require("dotenv").config();
const handler = require("../../services/handler");
const News = require("../../models/news");

module.exports = (req, res) => {
    News.findById(req.params.newsId).exec()
        .then(docs => {
            const response = {
                status: 200,
                collection: {
                    _id: docs._id,
                    premalink: docs.premalink,
                    subTitle: docs.subTitle,
                    content: docs.content,
                    title: docs.title,
                    createdAt: docs.createdAt,
                    updatedAt: docs.updatedAt,
                    img: {
                        id: docs.imgId,
                        path: docs.imgPath,
                    },
                    request: {
                        type: "GET",
                        description: "Get all news",
                        url: `${process.env.URL}/news/g`
                    }
                }
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