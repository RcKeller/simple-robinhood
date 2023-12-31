import Ticker from '../models/tickers.model'

// API Route to get all tickers stored in the db
export const getTickers = (req, res) => {
  Ticker.find()
    .then((tickers) => {
      let parsed: Array<any> = []
      // Return just ticker names
      tickers.forEach((ticker) => {
        parsed.push(ticker.name)
      })
      res.json(parsed)
    })
    .catch((err) => res.status(400).json('Error: ' + err))
}

// API Route to add a ticker with an initial price to db
export const addTicker = (req, res) => {
  const name = req.body.name
  const init_price = req.body.init_price
  // Create new ticker document
  const newTicker = new Ticker({
    name: name,
    init_price: init_price,
  })
  // Add it to db
  newTicker
    .save()
    .then(() => {
      console.log('new ticker added!')
      res.json('new ticket added!')
    })
    .catch((err) => res.status(400).json('Error: ' + err))
}
