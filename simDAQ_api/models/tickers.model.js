const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ticker = new Schema({
  name: { type: String, required: true, unique: true },
  init_price: { type: Number, required: true },
});

module.exports = mongoose.model("Ticker", Ticker);
