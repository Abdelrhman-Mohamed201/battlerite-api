const express = require("express");
const router = express.Router();

const controller = require("../controllers/images");
const checkAuth = require("../middleware/check-auth");

router.get("/g", controller.getAll);

router.get("/g/:imageId", controller.getById);

router.delete("/d/:imageId", checkAuth, controller.remove);

module.exports = router;