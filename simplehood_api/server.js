const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
// Use port from environment variables. If n/a, use port 4000 for dev
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const stocksRouter = require("./routes/stocks.route");
const tickersRouter = require("./routes/tickers.route");
// Routes to get stock prices and history
app.use("/stocks", stocksRouter);
// Route to get ticker names
app.use("/tickers", tickersRouter);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
