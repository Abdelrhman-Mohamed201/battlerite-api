require("dotenv").config();
const handler = require("../../services/handler");
const News = require("../../models/news");

module.exports = (req, res) => {
    const id = req.params.newsId;
    const updateOps = {updatedAt: Date.now(), ...req.body};
    News.update({_id: id}, {$set: updateOps}).exec()
        .then(docs => {
            const reponse = {
                status: 200,
                message: "News updated.",
                request: {
                    type: "GET",
                    url: `${process.env.URL}/news/g`
                }
            };
            res.status(reponse.status).json(reponse);
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