const http = require("http");

// API Route to fetch list of tickers
const getTickers = (req, res) => {
  // Options for request
  const options = {
    hostname: process.env.API_URL || "localhost",
    port: process.env.API_PORT || 5000,
    path: "/tickers",
    method: "GET",
  };
  const http_req = http.request(options, (http_res) => {
    var body = "";
    http_res.on("data", (d) => {
      body += d;
    });
    http_res.on("end", () => {
      // Request complete. Return data
      res.json(JSON.parse(body));
    });
  });
  http_req.on("error", (error) => {
    console.error(error);
  });
  http_req.end();
};

module.exports = {
  getTickers: getTickers,
};
