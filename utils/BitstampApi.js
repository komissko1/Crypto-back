const apiConfig = {
  baseUrl: 'https://www.bitstamp.net/api/v2/ticker/',
  tickers: ["usdteur", "btcusdt", "ethusdt", "xrpusdt", "shibusd", "dogeusd"]
};

class BitstampApi {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._tickers = apiConfig.tickers;
    this._targetUrl = `${apiConfig.baseUrl}/${apiConfig.tickers}`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getTickerData(pairs) {
    console.log(pairs);
    return fetch(this._baseUrl+`${JSON.stringify(this._tickers)}`, {
      headers: {
      "Content-Type": "application/json"},
    }).then(this._checkResponse);
  }
}

const bitstampApi = new BitstampApi(apiConfig);
module.exports.bitstampApi;
