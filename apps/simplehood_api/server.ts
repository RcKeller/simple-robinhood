import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import stocksRouter from './routes/stocks.route'
import tickersRouter from './routes/tickers.route'

dotenv.config()

const app = express()
// Use port from environment variables. If not available, use port 4000 for dev
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Routes to get stock prices and history
app.use('/stocks', stocksRouter)
// Route to get ticker names
app.use('/tickers', tickersRouter)

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`)
})
