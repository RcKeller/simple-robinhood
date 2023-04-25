const http = require("http");

// API Route to get stock prices
const getStocks = (req, res) => {
  if (!req || !req.body || !req.body.tickers) return res.json([]);
  // Get tickers for which prices were requested for
  const tickers = req.body.tickers;
  // Data to be passed on to simDAQ API request
  const data = JSON.stringify({
    tickers: tickers,
  });
  // Options to be used in API request
  const options = {
    // Use heroku hostname from env variables if in production; otherwise, use localhost for dev
    hostname: process.env.API_URL || "localhost",
    // Use heroku post if in production, otherwise use 5000 for dev
    port: process.env.API_PORT || 5000,
    path: "/stocks",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
  // Get stock prices from simDAQ API
  const http_req = http.request(options, (http_res) => {
    var body = "";
    http_res.on("data", (d) => {
      body += d;
    });
    http_res.on("end", () => {
      // Request complete. Return prices
      // console.log("updated stock");
      res.json(JSON.parse(body));
    });
  });
  http_req.on("error", (error) => {
    console.error(error);
  });
  http_req.write(data);
  http_req.end();
};

// API Route to get historical stock prices
const getHistory = (req, res) => {
  // Get stock ticker
  const ticker = req.params.ticker;
  // Options for request. Use same hostname and port as before
  const options = {
    hostname: process.env.API_URL || "localhost",
    port: process.env.API_PORT || 5000,
    path: `/stocks/history/${ticker}`,
    method: "GET",
  };
  const http_req = http.request(options, (http_res) => {
    var body = "";
    http_res.on("data", (d) => {
      body += d;
    });
    http_res.on("end", () => {
      // Request complete
      res.json(JSON.parse(body));
    });
  });
  http_req.on("error", (error) => {
    console.error(error);
  });
  http_req.end();
};

module.exports = {
  getStocks: getStocks,
  getHistory: getHistory,
};
