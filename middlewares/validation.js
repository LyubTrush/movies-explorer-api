const { Joi, celebrate } = require('celebrate');
const { linkRegex, linkImageRegex } = require('../utils/regex');


module.exports.createUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.updateProfileValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.saveMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkImageRegex),
    thumbnail: Joi.string().required().regex(linkImageRegex),
    trailer: Joi.string().required().regex(linkRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidate = celebrate({
  body: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});


