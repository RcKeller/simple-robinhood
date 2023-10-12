import { Router } from 'express'
import { getHistory, getStocks } from '../controllers/stocks.controller'

const router = Router()

router.post('/', getStocks)
router.get('/history/:ticker', getHistory)

export default router
