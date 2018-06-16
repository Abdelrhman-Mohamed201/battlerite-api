const express = require("express");
const router = express.Router();

const controller = require("../controllers/champions");
const checkAuth = require("../middleware/check-auth");

router.get("/g", controller.getAll);

router.post("/p", checkAuth, controller.create);

router.get("/g/:championId", controller.getById);

router.patch("/u/:championId", checkAuth, controller.update);

router.delete("/d/:championId", checkAuth, controller.remove);

module.exports = router;