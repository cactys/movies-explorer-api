const mongoose = require('mongoose');
const User = require('../models/user');

const MONGO_URL = 'mongodb://localhost:27017/moviedb';
const fixtures = {
  user: {
    name: 'Вася',
    password: '1234QWer$',
    email: 'vasya-frontend@yandex.ru',
  },
};

beforeAll(() => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
  });
});

afterAll(() => mongoose.disconnect());

describe('Database tests', () => {
  beforeEach(() => {
    const {
      name,
      email,
      password,
    } = fixtures.user;

    return User.create({
      name,
      email,
      password,
    });
  });

  afterEach(() => User.deleteOne({ email: fixtures.user.email }));

  it('Пользователь должен быть', () => User.findOne({ email: fixtures.user.email })
    .then((user) => {
      expect(user).toBeDefined();
      expect(user.email).toBe(fixtures.user.email);
      expect(user.name).toBe(fixtures.user.name);
    }));
});
