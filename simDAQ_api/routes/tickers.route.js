const router = require("express").Router();
const tickerController = require("../controllers/tickers.controller");

// API Route to get stock tickers
router.get("/", tickerController.getTickers);
// API Route to add stock tickers
router.post("/new", tickerController.addTicker);

module.exports = router;
