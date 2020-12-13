const http = require("http");

const getTickers = (req, res) => {
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
      res.json(JSON.parse(body));
    });
  });
  http_req.on("error", (error) => {
    console.error(error);
  });
  http_req.end();
};

const addTicker = (req, res) => {
  const name = req.body.name;
  const init_price = req.body.init_price;
  const newTicker = new Ticker({
    name: name,
    init_price: init_price,
  });
  newTicker
    .save()
    .then(() => {
      console.log("new ticker added!");
      res.json("new ticket added!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getTickers: getTickers,
  addTicker: addTicker,
};
