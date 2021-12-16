const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Неверные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findById(req.params.cardId)
    .orFail(() => { throw new NotFoundError('NotFound'); })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError(
          'Действие недоступно. Вы не являетесь владельцем карточки',
        );
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Неверные данные'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Карточки не существует'));
      } else {
        next(err);
      }
    });
};

const likeCards = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => { throw new NotFoundError('Карточки с таким id не существует'); })
    .then((likeCard) => res.send(likeCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Id неверный'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => { throw new NotFoundError('Карточки с таким id не существует'); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Id неверный'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCards,
  dislikeCard,
};
