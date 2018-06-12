const express = require("express");
const router = express.Router();

const controller = require("../controllers/users");
const checkAuth = require("../middleware/check-auth");

router.get("/g", checkAuth, controller.getAll);

router.post("/signup", controller.signup);

router.post("/signin", controller.signin);

router.post("/logout", controller.logout);

router.get("/g/:userId", checkAuth,controller.getById);

router.patch("/u/:userId", checkAuth, controller.update);

router.delete("/d/:userId", checkAuth, controller.remove);

module.exports = router;