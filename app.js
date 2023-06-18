require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./utils/rateLimiter');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DATABASE } = require('./utils/constants');

const {
  PORT = 3000,
  MONGO_LINK = DATABASE,
} = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

mongoose.connect(MONGO_LINK);
app.use(requestLogger);
app.use(rateLimiter);
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
