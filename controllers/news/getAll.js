require("dotenv").config();
const handler = require("../../services/handler");
const News = require("../../models/news");

module.exports = (req, res) => {
    News.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                ...docs.map(news => {
                    return {
                        collection: news,
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/news/g/${news._id}`
                        }
                    }
                })
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