const moviesRouter = require('express').Router();
const { saveMovieValidate, deleteMovieValidate } = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', saveMovieValidate, createMovie);
moviesRouter.delete('/:movieId', deleteMovieValidate, deleteMovie);

module.exports = moviesRouter;
