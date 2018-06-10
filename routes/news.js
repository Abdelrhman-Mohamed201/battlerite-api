const express = require("express");
const router = express.Router();

const multer = require("../config/multer").single("img");

const controller = require("../controllers/news");
const checkAuth = require("../middleware/check-auth");

router.get("/g", controller.getAll);

router.post("/p", checkAuth, multer, controller.create);

router.get("/g/:newsId",controller.getById);

router.patch("/u/:newsId", checkAuth, controller.update);

router.delete("/d/:newsId", checkAuth, controller.remove);

module.exports = router;