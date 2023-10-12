import mongoose from 'mongoose'

const { Schema } = mongoose

// Each document holds the stock ticker, price, and date it was generated
const StockSchema = new Schema({
  ticker: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
})

const Stock = mongoose.model('Stock', StockSchema)
export default Stock
