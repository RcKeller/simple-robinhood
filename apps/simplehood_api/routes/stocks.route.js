const router = require("express").Router();
const stocksController = require("../controllers/stocks.controller");

router.post("/", stocksController.getStocks);
router.get("/history/:ticker", stocksController.getHistory);

module.exports = router;
