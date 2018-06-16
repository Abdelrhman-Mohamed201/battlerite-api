const express = require("express");
const router = express.Router();

const controller = require("../controllers/builds");
const checkAuth = require("../middleware/check-auth");

router.get("/g", controller.getAll);

router.post("/p", checkAuth, controller.create);

router.get("/g/:buildId",controller.getById);

router.patch("/u/:buildId", checkAuth, controller.update);

router.delete("/d/:buildId", checkAuth, controller.remove);

module.exports = router;