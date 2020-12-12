const router = require("express").Router();
const tickerController = require("../controllers/tickers.controller");

router.get("/", tickerController.getTickers);
router.post("/new", tickerController.addTicker);

module.exports = router;
