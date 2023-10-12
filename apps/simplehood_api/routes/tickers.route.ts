import express from 'express'
import { getTickers } from '../controllers/tickers.controller'

// Create an instance of Express router
const router = express.Router()

// API Route to get tickers
router.get('/', getTickers)

export default router
