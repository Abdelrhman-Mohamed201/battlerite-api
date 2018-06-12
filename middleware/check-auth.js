const jwt = require("jsonwebtoken");
const handler = require("../services/handler");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        // Split to remove "Bearer" by the space
        const token = req.headers.authorization.split(" ")[1];

        // Check on the token
        const user = jwt.verify(token, process.env.JWT_KEY);

        // Check if he is admin or not
        if (user.userData.role === "admin") {
            next();
        } else {
            handler({
                req, res,
                status: 401,
                kind: "Auth failed"
            })
        }
    } catch (err) {
        handler({
            req, res,
            error: err,
            status: 401,
            kind: "Token missing or expired."
        })
    }
};