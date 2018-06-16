require("dotenv").config();
const handler = require("../../services/handler");
const News = require("../../models/news");

module.exports = (req, res) => {
    const id = req.params.newsId;
    const updateOps = {updatedAt: Date.now(), ...req.body};
    News.update({_id: id}, {$set: updateOps}).exec()
        .then(docs => {
            const reponse = {
                message: "News updated",
                request: {
                    type: "GET",
                    url: `${process.env.URL}/news/g/${id}`
                },
                status: 200
            };
            res.status(200).json(reponse)
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