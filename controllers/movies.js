// getMovies,
  // createMovie,
  // deleteMovie,

const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id
    })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { filmId } = req.params;
  Movie
  .findById(filmId)
  .then((movie) => {
    if (!movie) {
      throw new NotFoundError('Карточка не найдена');
    }
    if (movie.owner.toString() !== userId) {
      throw new ForbiddenError('Карточка принадлежит другому пользователю');
    }
    card.deleteOne()
        .then(() => res.send({ message: 'Card is deleted' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректный id карточки'));
      }
      return next(err);
    });
};

