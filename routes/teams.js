const express = require("express");
const router = express.Router();

const controller = require("../controllers/teams");

router.get("/g",controller.getAll);

module.exports = router;