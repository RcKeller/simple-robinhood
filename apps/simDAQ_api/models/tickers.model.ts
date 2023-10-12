import mongoose from 'mongoose'

const { Schema } = mongoose

// Define the Ticker schema
const TickerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  init_price: { type: Number, required: true },
})

// Create and export the Ticker model
const Ticker = mongoose.model('Ticker', TickerSchema)
export default Ticker
