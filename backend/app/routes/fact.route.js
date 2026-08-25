const router = require("express").Router();
const factController = require("../controllers/fact.controller");

router.get("/", factController.getDailyFacts);

module.exports = router;