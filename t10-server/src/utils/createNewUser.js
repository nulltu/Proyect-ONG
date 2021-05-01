const bcrypt = require('bcrypt');
const { userImage } = require('./S3-AWS/defaultImages');

const createNewUser = async (body, roleId, emailVerified) => {
  const { firstName, lastName, email, password } = body;

  const salt = await bcrypt.genSalt(10);
  const encryptPass = await bcrypt.hash(password, salt);

  return {
    firstName,
    lastName,
    email,
    image: userImage,
    password: encryptPass,
    roleId,
    emailVerified: emailVerified || false,
    organizationId: 1,
  };
};

module.exports = createNewUser;
