require("dotenv").config();
const Users = require("../../models/users");

module.exports = (req, res) => {
    const id = req.params.userId;
    Users.remove({_id: id}).exec()
        .then(docs => {
            const request = {
                type: "GET",
                url: `${process.env.URL}/users/g`,
            };
            if (!docs.n) {
                res.status(404).json({
                    status: 404,
                    message: "User not found.",
                    request,
                })
            } else {
                res.status(200).json({
                    status: 200,
                    message: "User deleted.",
                    request,
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Cannot remove that user.",
                status: 500,
                error: err
            })
        })
};