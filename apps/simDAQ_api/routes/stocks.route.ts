// Import the necessary modules using ES6 import syntax
import { Router } from 'express'
import { getHistory, getStocks } from '../controllers/stocks.controller'

// Create an Express router
const router = Router()

// API Route to get stock prices
router.post('/', getStocks)

// API Route to get historical prices
router.get('/history/:ticker', getHistory)

// Export the router
export default router
