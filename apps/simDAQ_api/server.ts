import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import stocksRouter from './routes/stocks.route'
import tickersRouter from './routes/tickers.route'

dotenv.config()

const app = express()
// Get port from environment variables. If none, use port 5000 for development
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Get db uri from environment variables
const uri = process.env.MONGO_URI
if (!uri) {
  console.error(
    'MONGO_URI is required, but not defined in an environment variabe'
  )
  process.exit(1)
}
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

// Routes to fetch stock prices and history
app.use('/stocks', stocksRouter)
// Routes to get and add stock tickers
app.use('/tickers', tickersRouter)

app.listen(PORT, () => {
  console.log('Server is running on Port: ' + PORT)
})
