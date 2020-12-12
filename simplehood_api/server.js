const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const stocksRouter = require("./routes/stocks.route");
const tickersRouter = require("./routes/tickers.route");
app.use("/stocks", stocksRouter);
app.use("/tickers", tickersRouter);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
