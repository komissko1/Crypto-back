// const nodeFetch = require("cross-fetch");
// const XMLHttpRequest = require("cors-anywhere");
var cors_api_url = "https://cors-anywhere.herokuapp.com/";

const { bitstampApi } = require("../utils/BitstampApi");
const baseUrl = "https://www.bitstamp.net/api/v2/ticker/btcusd";
const targetUrl =
  "http://cors-anywhere.herokuapp.com/https://www.bitstamp.net/api/v2/ticker/";

module.exports.ticker = (req, res, next) => {
  var x = new XMLHttpRequest;
  x.open("GET", cors_api_url + baseUrl);
  x.onload = x.onerror = function () {
    console.log({
      status: x.status,
      statusText: x.statusText,
      responseText: x.responseText,
    });
    res.status(200).send({
      status: x.status,
      statusText: x.statusText,
      responseText: x.responseText,
    });
  };
  x.send("");
};

// nodeFetch(baseUrl, {
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((data) => {
//     console.log(data);
//     res.status(200).send({
//       message: data,
//     });
//   })
//   .catch((err) => {
//     console.error("Servers error");
//   });

// const currentRates = bitstampApi.getTickerData(req.params.pairs);
// console.log(currentRates);
