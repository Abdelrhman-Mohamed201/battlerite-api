require('dotenv').config()
const Users = require("../../models/users")

update = (req, res, next) => {
    const id = req.params.userId
    const updateOps = {updatedAt: Date.now()}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Users.update({_id: id}, {$set: updateOps}).exec()
        .then(docs => {
            const reponse = {
                message: 'User updated',
                request: {
                    type: 'GET',
                    url: `${process.env.URL}/users/g/${id}`
                },
                status: 200
            }
            res.status(200).json(reponse)
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        })
}

module.exports = update