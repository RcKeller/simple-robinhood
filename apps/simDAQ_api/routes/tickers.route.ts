// Import the necessary modules using ES6 import syntax
import { Router } from 'express'
import { addTicker, getTickers } from '../controllers/tickers.controller'

// Create an Express router
const router = Router()

// API Route to get stock tickers
router.get('/', getTickers)

// API Route to add stock tickers
router.post('/new', addTicker)

// Export the router
export default router
