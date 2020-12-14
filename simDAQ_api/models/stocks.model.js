const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Each document holds the stock ticker, price, and date it was generated
const Stock = new Schema({
  ticker: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Stock", Stock);
