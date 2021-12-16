const express = require('express');

const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const ValidationError = require('./errors/ValidationError');

dotenv.config();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  /* useCreateIndex: true,
    useFindAndModify: false */
});

app.use(cors({
  origin: 'https://mesto.orlovas.nomoredomains.rocks',
  credentials: true,
}));

app.use(requestLogger);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new ValidationError('Введенный текст не является ссылкой');
        }
        return value;
      }),
      about: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  }),
  login,
);

app.use(auth);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use(errors());

app.all('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
