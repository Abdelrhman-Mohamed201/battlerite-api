require("dotenv").config();
const Users = require("../../models/users");

module.exports = (req, res) => {
    Users.findById(req.params.userId).exec()
        .then(docs => {
            const response = {
                status: 200,
                collection: {
                    _id: docs._id,
                    name: docs.name,
                    email: docs.email,
                    password: docs.password,
                    role: docs.role,
                    createdAt: docs.createdAt,
                    updatedAt: docs.updatedAt,
                    lastLoginAt: docs.lastLoginAt,
                    request: {
                        type: "GET",
                        description: "Get all users",
                        url: `${process.env.URL}/users/g`
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