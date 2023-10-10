const mongoose = require("mongoose");
const Stock = require("../models/stocks.model");
const Ticker = require("../models/tickers.model");

// Object to hold prices that will be updated every second
let stocks;
// Counts how many seconds the program has been running for
let cnt = 0;

// Get random number in between a and b
const randBetween = (a, b) => {
  return Math.random() * (b - a) + a;
};

const TICKERS = [
  { name: "AAPL", init_price: 100 },
  { name: "MSFT", init_price: 200 },
  { name: "GOOG", init_price: 300 },
  { name: "AMZN", init_price: 400 },
  { name: "FB", init_price: 500 },
];

const initializeTickers = async () => {
  return await Promise.all(
    TICKERS.map(async (ticker) => await Ticker.create(ticker))
  );
};

// Function to initialize stocks object when server first starts up
const initializeStocks = () => {
  stocks = {};
  // Fetch list of tickers from db
  Ticker.find()
    .then(async (tickers) => {
      if (!tickers?.length) {
        tickers = await initializeTickers();
      }
      for (const ticker of tickers) {
        const latestStockEvent = await Stock.findOne({
          ticker: ticker.name,
        }).sort({ createdAt: -1 });
        stocks[ticker.name] = latestStockEvent.price || ticker.init_price;
      }
    })
    .catch((err) => console.log("Error: " + err));
};

// Runs every second
const test = setInterval(() => {
  // Fetch tickers and initialize stocks at first
  if (!stocks) initializeStocks();
  // Iterate over each ticker
  for (let ticker in stocks) {
    stocks[ticker];
    // Previous price
    const prev_price = stocks[ticker];
    // Set new price
    stocks[ticker] = randBetween(0.95 * prev_price, 1.05 * prev_price);
    // Add to historical data in db every minute
    if (cnt % 60 === 0) {
      const newStockEvent = new Stock({
        ticker: ticker,
        price: stocks[ticker],
      });
      newStockEvent
        .save()
        .then(() => console.log("stock time event added!"))
        .catch((err) => console.log("DB error: " + err));
    }
  }
  // Increment cnt and display updated message
  cnt++;

  // console.log("updated: ", cnt);
}, 1000);

// Stops function from running every second. For debugging
// clearInterval(test);

// API Route that returns stock prices
const getStocks = (req, res) => {
  // Invalid request
  if (!req || !req.body || !req.body.tickers || !stocks) return res.json([]);
  // Tickers to get prices for
  const tickers = req.body.tickers;
  let ret = [];
  tickers.forEach((ticker) => {
    if (!stocks[ticker]) return;
    ret.push([ticker, stocks[ticker]]);
  });
  // Return prices
  res.json(ret);
};

// API Route that returns historical stock prices
const getHistory = (req, res) => {
  // Get ticker
  const ticker = req.params.ticker;
  // Get historical data for this ticker from db
  Stock.find({ ticker: ticker })
    .then((stock) => {
      let parsed = [];
      stock.forEach((entry) => {
        // Get time in local timezone
        parsed.push([entry.date.toString(), entry.price]);
      });
      // Return date and prices
      res.json(parsed);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getStocks: getStocks,
  getHistory: getHistory,
};
