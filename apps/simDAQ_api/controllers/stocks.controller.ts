import { Request, Response } from 'express'
import { weightedRandBetween } from '../lib/weightedRandBetween'
import Stock from '../models/stocks.model'
import Ticker from '../models/tickers.model'

interface TickerType {
  name: string
  init_price: number
}

// Define the structure of stocks
interface StocksType {
  [key: string]: number
}

let stocks: StocksType
let cnt: number = 0

const TICKERS: TickerType[] = [
  { name: 'AAPL', init_price: 100 },
  { name: 'MSFT', init_price: 200 },
  { name: 'GOOG', init_price: 300 },
  { name: 'AMZN', init_price: 400 },
  { name: 'FB', init_price: 500 },
]

const initializeTickers = async (): Promise<void> => {
  await Promise.all(
    TICKERS.map(async (ticker: TickerType) => await Ticker.create(ticker))
  )
}

const initializeStocks = (): void => {
  stocks = {}
  Ticker.find()
    .then(async (tickers) => {
      if (!tickers?.length) {
        await initializeTickers()
      }
      for (const ticker of tickers) {
        const latestStockEvent = await Stock.findOne({
          ticker: ticker.name,
        }).sort({ createdAt: -1 })
        if (stocks && latestStockEvent) {
          stocks[ticker.name] = latestStockEvent.price || ticker.init_price
        }
      }
    })
    .catch((err: Error) => console.log('Error: ' + err))
}

const test = setInterval(() => {
  if (!stocks) initializeStocks()
  for (let ticker in stocks) {
    const prev_price: number = stocks[ticker]
    const stdDev: number = 0.05 * prev_price
    stocks[ticker] = weightedRandBetween(prev_price, stdDev)
    if (cnt % 60 === 0) {
      const newStockEvent = new Stock({
        ticker: ticker,
        price: stocks[ticker],
      })
      newStockEvent
        .save()
        .then(() => console.log('stock time event added!'))
        .catch((err: Error) => console.log('DB error: ' + err))
    }
  }
  cnt++
}, 1000)

export const getStocks = (req: Request, res: Response) => {
  if (!req || !req.body || !req.body.tickers || !stocks) return res.json([])
  const tickers: string[] = req.body.tickers
  let ret: Array<[string, number]> = []
  tickers.forEach((ticker: string) => {
    if (stocks && stocks[ticker]) {
      ret.push([ticker, stocks[ticker]])
    }
  })
  res.json(ret)
}

export const getHistory = (req: Request, res: Response): void => {
  const ticker: string = req.params.ticker
  Stock.find({ ticker: ticker })
    .then((stock) => {
      let parsed: Array<[string, number]> = []
      stock.forEach((entry) => {
        parsed.push([entry.date.toString(), entry.price])
      })
      res.json(parsed)
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err))
}
