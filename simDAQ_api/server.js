const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
// Get port from environment variables. If none, use port 5000 for development
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get db uri from environment variables
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const stocksRouter = require("./routes/stocks.route");
const tickersRouter = require("./routes/tickers.route");
// Routes to fetch stock prices and history
app.use("/stocks", stocksRouter);
// Routes to get and add stock tickers
app.use("/tickers", tickersRouter);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
