const corsAnywhere = require('cors-anywhere');

const bitStampUrl = '/https://www.bitstamp.net/api/v2/ticker/';

module.exports.bitStampTicker = (req, res) => {
  const proxy = corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeaders: [], // Do not require any headers.
    removeHeaders: [], // Do not remove any headers.
  });

  if (req.params.currency) {
    req.url = `${bitStampUrl + req.params.currency}`;
  } else {
    req.url = bitStampUrl;
  }

  proxy.emit('request', req, res);
};
