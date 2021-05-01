const express = require('express');
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const paramId = require('../validators/param.id');
const body = require('../validators/req.body.theme');
const authenticate = require('../middlewares/auth/authenticate');
const roleAuth = require('../middlewares/auth/roleAuth');
const create = require('../controllers/theme/create');
const update = require('../controllers/theme/update');
const getAll = require('../controllers/theme/getAll');
const remove = require('../controllers/theme/delete');

const router = express.Router();

router.get('/', asyncMiddleware(getAll));
router.post(
  '/',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  body,
  asyncMiddleware(create),
);

router.put(
  '/:id',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  [body, paramId],
  asyncMiddleware(update),
);

router.delete(
  '/:id',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  paramId,
  asyncMiddleware(remove),
);

module.exports = router;
