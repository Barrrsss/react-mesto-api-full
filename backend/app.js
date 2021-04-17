const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { errors } = require('./middlewares/errors');

const app = express();

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 204,
};

app.use(express.json(), cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS',
  );
  next();
});

const { requestLogger, errorLogger } = require('./middlewares/errorlog');

app.use(bodyParser.json());

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(require('./routes/auth'));

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors);

app.listen(PORT, () => {

});
