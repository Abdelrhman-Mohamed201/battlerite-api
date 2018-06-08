require('dotenv').config()
const Images = require("../../models/images")

getAll = (req, res, next) => {
    Images.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                collection: docs.map(image => {
                    return {
                        _id: image._id,
                        originalname: image.originalname,
                        path: image.path,
                        request: {
                            type: 'GET',
                            url: `${process.env.URL}/images/${image._id}`
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

module.exports = getAll