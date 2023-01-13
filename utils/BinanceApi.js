const apiConfig = {
  baseUrl: 'https://binance.com/api/v3/ticker',
  targetUrl: 'http://127.0.0.1:8080/',
  tickers: ["BTCUSDT","BNBBTC"]
};

class BinanceApi {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._targetUrl = apiConfig.targetUrl;
    this._tickers = apiConfig.tickers
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log(res);
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getTickerData() {
    return fetch(this._targetUrl+`?symbols=${JSON.stringify(this._tickers)}`, {
      headers: {
      "Content-Type": "application/json"},
    }).then(this._checkResponse);
  }
}

const binanceApi = new BinanceApi(apiConfig);
export default binanceApi;
