const boom = require('@hapi/boom');
const message = require('../../utils/error.messages');

const ADMIN = 1;

const roleAuth = {
  onlyAdmin: (req, res, next) => {
    if (ADMIN !== req.user.roleId) {
      throw boom.unauthorized(message.ONLY_ADMIN);
    }
    next();
  },
  onlySelfData: (req, res, next) => {
    const { roleId, id } = req.user;
    const paramID = req.params.id;
    if (roleId === ADMIN || id === Number(paramID)) {
      return next();
    }
    throw boom.unauthorized();
  },
};

module.exports = roleAuth;
