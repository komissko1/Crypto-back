const corsAnywhere = require("cors-anywhere");
const bitStampUrl = "/https://www.bitstamp.net/api/v2/ticker/";
// const activeTickers = [
//   "usdteur",
//   "btcusdt",
//   "ethusdt",
//   "xrpusdt",
//   "shibusd",
//   "dogeusd",
// ];

module.exports.bitStampTicker = (req, res, next) => {
  const proxy = corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeaders: [], // Do not require any headers.
    removeHeaders: [], // Do not remove any headers.
  });

  if (req.params.currency) {
    req.url = bitStampUrl + `${req.params.currency}`;
  } else {
    req.url = bitStampUrl;
  }

  proxy.emit("request", req, res);
};


