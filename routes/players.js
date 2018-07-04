const express = require("express");
const router = express.Router();

const controller = require("../controllers/players");

router.get("/g/filter",controller.getByFilter);

router.get("/g/:playerId",controller.getById);

module.exports = router;