require("dotenv").config();
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
                    created_at: docs.created_at,
                    updated_at: docs.updated_at,
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
            res.status(500).json({
                status: 500,
                error: err
            })
        })
};