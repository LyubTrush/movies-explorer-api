// добавить валидацию

const userRouter = require('express').Router();
const { updateProfileValidate }=require('../middlewares/validation')

const {
  getUser,
  updateUser,
} = require('../controllers/users');

userRouter.get('/me', getUser);
userRouter.patch('/me', updateProfileValidate, updateUser);

module.exports = userRouter;