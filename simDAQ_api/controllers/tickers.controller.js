const mongoose = require("mongoose");
const Ticker = require("../models/tickers.model");

const getTickers = (req, res) => {
  Ticker.find()
    .then((tickers) => {
      let parsed = [];
      tickers.forEach((ticker) => {
        parsed.push(ticker.name);
      });
      res.json(parsed);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const addTicker = (req, res) => {
  const name = req.body.name;
  const init_price = req.body.init_price;
  const newTicker = new Ticker({
    name: name,
    init_price: init_price,
  });
  newTicker
    .save()
    .then(() => {
      console.log("new ticker added!");
      res.json("new ticket added!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getTickers: getTickers,
  addTicker: addTicker,
};
