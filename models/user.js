// email — почта пользователя, по которой он регистрируется. Это обязательное поле, уникальное для каждого пользователя.
// Также оно должно валидироваться на соответствие схеме электронной почты.
// password — хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
// name — имя пользователя, например: Александр или Мария. Это обязательное поле-строка от 2 до 30 символов.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильный формат адреса электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: (value) => value.length >= 8,
      message: 'Пароль должен содержать минимум 8 символов',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new UnauthorizedError('Неправильные логин или пароль'));
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);