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
    .then((movie) => res.status(201).send(movie),console.log(req.body))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id
  Movie
  .findById(movieId)
  .then((movie) => {
    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }
    if (movie.owner.toString() !== userId) {
      throw new ForbiddenError('Фильм принадлежит другому пользователю');
    }
    Movie.deleteOne()
        .then(() => res.send({ message: 'Movie is deleted' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректный id фильма'));
      }
      return next(err);
    });
};

