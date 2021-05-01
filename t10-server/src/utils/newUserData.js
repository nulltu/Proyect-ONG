const newUserData = (user) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  image: user.image,
  roleId: user.roleId,
  emailVerified: user.emailVerified,
  organizationId: user.organizationId,
});

module.exports = newUserData;
