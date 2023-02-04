// Читать про process.env;



const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');


// Use .env for environment keys
require('dotenv').config();
const { PORT = 3002, NODE_ENV } = process.env;

const app = express();
app.use(cookieParser());
app.use(requestLogger);


// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

// Mongoose DB connection
mongoose.connect(NODE_ENV === 'production' ? DB_ADRESS : 'mongodb://localhost:27017/cryptodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// parses incoming JSON requests and puts the parsed data in req.body. Not limited bytes
app.use(express.json());

// Routers
app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Error on the servers side' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});