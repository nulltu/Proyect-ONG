const mocks = {
  emailEmpty: {
    email: '',
    password: 'test',
    firstName: 'user',
    lastName: 'test',
  },
  emailInvalid: {
    email: 'www',
    password: 'test',
    firstName: 'user',
    lastName: 'test',
  },
  passwordEmpty: {
    email: 'other@test.com',
    password: '',
    firstName: 'user',
    lastName: 'test',
  },
  firstNameEmpty: {
    email: 'other@test.com',
    password: 'test',
    firstName: '',
    lastName: 'test',
  },
  lastNameEmpty: {
    email: 'other@test.com',
    password: 'test',
    firstName: 'user',
    lastName: '',
  },
  userAlreadyExist: {
    email: 'admin@test.com',
    password: 'test',
    firstName: 'user',
    lastName: 'test',
  },
};

module.exports = mocks;
