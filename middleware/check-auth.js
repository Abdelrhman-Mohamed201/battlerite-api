const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../models/users");

module.exports = (req, res, next) => {
    try {
        // Split to remove "Bearer" by the space
        const token = req.headers.authorization.split(" ")[1];

        // Check on the token
        req.userData = jwt.verify(token, process.env.JWT_KEY);

        // Select the user data to check if he is admin or not
        Users.findById(req.userData.userId).exec()
            .then(user => {
                if (user.role === "admin") {
                    next();
                } else {
                    return res.status(401).json({
                        status: 401,
                        message: "Auth failed"
                    })
                }
            })
            .catch(err => {
                return res.status(500).json({
                    status: 500,
                    message: "Cannot access the user data."
                })
            });
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: "Auth failed"
        })
    }
};