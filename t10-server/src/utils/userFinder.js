const { Op } = require('sequelize');

const userFinder = (search) => {
  const likeSearch = {
    [Op.like]: `%${search}%`,
  };

  return {
    [Op.or]: [
      { firstName: likeSearch },
      { lastName: likeSearch },
      { email: likeSearch },
    ],
  };
};

module.exports = userFinder;
