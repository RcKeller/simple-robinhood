const mongoose = require("mongoose");
const Stock = require("../models/stocks.model");
const Ticker = require("../models/tickers.model");

var stocks;
var cnt = 0;

const randBetween = (a, b) => {
  return Math.random() * (b - a) + a;
};

const initializeStocks = () => {
  stocks = {};
  Ticker.find()
    .then((tickers) => {
      tickers.forEach((ticker) => {
        stocks[ticker.name] = [ticker.init_price, "black"];
      });
    })
    .catch((err) => console.log("Error: " + err));
};

const test = setInterval(() => {
  if (!stocks) initializeStocks();
  for (let ticker in stocks) {
    stocks[ticker];
    const prev_price = stocks[ticker][0];
    stocks[ticker][0] = randBetween(0.95 * prev_price, 1.05 * prev_price);
    stocks[ticker][1] = stocks[ticker][0] > prev_price ? "green" : "red";
    if (cnt % 60 === 0) {
      const newStockEvent = new Stock({
        ticker: ticker,
        price: stocks[ticker][0],
      });
      newStockEvent
        .save()
        .then(() => console.log("stock time event added!"))
        .catch((err) => console.log("DB error: " + err));
    }
  }
  cnt++;
  console.log("updated: ", cnt);
}, 1000);

// clearInterval(test);

const getStocks = (req, res) => {
  if (!req || !req.body || !req.body.tickers || !stocks) return res.json([]);
  const tickers = req.body.tickers;
  let ret = [];
  tickers.forEach((ticker) => {
    if (!stocks[ticker]) return;
    ret.push([ticker, stocks[ticker][0], stocks[ticker][1]]);
  });
  res.json(ret);
};

const getHistory = (req, res) => {
  const ticker = req.params.ticker;
  Stock.find({ ticker: ticker })
    .then((stock) => {
      let parsed = [];
      stock.forEach((entry) => {
        parsed.push([entry.date.toString(), entry.price]);
      });
      res.json(parsed);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getStocks: getStocks,
  getHistory: getHistory,
};
