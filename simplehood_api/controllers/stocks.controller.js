const http = require("http");

const getStocks = (req, res) => {
  if (!req || !req.body || !req.body.tickers) return res.json([]);
  const tickers = req.body.tickers;
  const data = JSON.stringify({
    tickers: tickers,
  });
  const options = {
    hostname: "localhost",
    port: 5000,
    path: "/stocks",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
  const http_req = http.request(options, (http_res) => {
    var body = "";
    http_res.on("data", (d) => {
      body += d;
    });
    http_res.on("end", () => {
      console.log("updated stock");
      res.json(JSON.parse(body));
    });
  });
  http_req.on("error", (error) => {
    console.error(error);
  });
  http_req.write(data);
  http_req.end();
};

const getHistory = (req, res) => {
  const ticker = req.params.ticker;
  const options = {
    hostname: "localhost",
    port: 5000,
    path: `/stocks/history/${ticker}`,
    method: "GET",
  };
  const http_req = http.request(options, (http_res) => {
    var body = "";
    http_res.on("data", (d) => {
      body += d;
    });
    http_res.on("end", () => {
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
