const express = require('express');

const cors = require('cors');

const { PORT = 3002, NODE_ENV } = process.env;
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: false,
}));

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
];

// import { MainClient } from 'binance'

// const proxy = 'http://127.0.0.1:8080/'
app.use('/', require('./routes/index'));


// const baseUrl = 'https://api.binance.com'
// const realClient = new MainClient({
//     api_key: 'your_api_key',
//     api_secret: 'your_api_secret',
//     beautifyResponses: false,
//     baseUrl: proxy + baseUrl,
//     recvWindow: 40000
// })

// app.use(express.json());


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '127.0.0.1';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

