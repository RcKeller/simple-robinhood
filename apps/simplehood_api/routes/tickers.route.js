const router = require("express").Router();
const tickerController = require("../controllers/tickers.controller");

// API Route to get tickers
router.get("/", tickerController.getTickers);

module.exports = router;
