const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Stock = new Schema({
  ticker: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Stock", Stock);
