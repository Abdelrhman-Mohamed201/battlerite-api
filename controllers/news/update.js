require("dotenv").config();
const News = require("../../models/news");

const update = (req, res, next) => {
    const id = req.params.newsId;
    const updateOps = {updated_at: Date.now()};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

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
            res.status(500).json({
                status: 500,
                error: err
            })
        })
};

module.exports = update;