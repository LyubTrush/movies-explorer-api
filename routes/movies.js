const moviesRouter = require('express').Router();
const { saveMovieValidate } = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', saveMovieValidate, createMovie);
moviesRouter.delete('/:movieId', deleteMovie);

module.exports = moviesRouter;