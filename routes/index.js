const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { loginValidate, createUserValidate } = require('../middlewares/validation');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const moviesRouter = require('./movies');
const userRouter = require('./users');

router.post('/signup', createUserValidate, createUser);
router.post('/signin', loginValidate, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('404: страница не существует'));
});

module.exports = router;
