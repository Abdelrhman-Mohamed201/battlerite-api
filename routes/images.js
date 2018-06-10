const express = require("express");
const router = express.Router();
const controller = require("../controllers/images");

router.get("/g", controller.getAll);
router.get("/g/:imageId", controller.getById);
router.delete("/d/:imageId", controller.remove);

module.exports = router;