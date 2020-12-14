const router = require("express").Router();
const stocksController = require("../controllers/stocks.controller");

// API Route to get stock prices
router.post("/", stocksController.getStocks);
// API Route to get historical prices
router.get("/history/:ticker", stocksController.getHistory);

module.exports = router;
