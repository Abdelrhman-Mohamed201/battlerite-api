require("dotenv").config();
const handler = require("../../services/handler");
const News = require("../../models/news");

module.exports = (req, res) => {
    News.findById(req.params.newsId).exec()
        .then(docs => {
            const response = {
                status: 200,
                collection: docs,
                request: {
                    type: "GET",
                    description: "Get all news",
                    url: `${process.env.URL}/news/g`
                }
            };
            res.status(response.status).json(response);
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