const updateUser = (body) => {
  const { firstName, lastName, image } = body;

  return {
    firstName,
    lastName,
    ...(image ? { image } : {}),
  };
};

module.exports = updateUser;
