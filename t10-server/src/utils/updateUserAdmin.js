const updateUser = (body) => {
  const { firstName, lastName, email, roleId } = body;

  return {
    firstName,
    lastName,
    email,
    roleId,
  };
};

module.exports = updateUser;
