const express = require("express");
const router = express.Router();

const controller = require("../controllers/search");

router.get("/g/players/filter",controller.getByFilter);

router.get("/g/players/:playerId",controller.getById);

module.exports = router;