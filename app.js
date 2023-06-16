require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});