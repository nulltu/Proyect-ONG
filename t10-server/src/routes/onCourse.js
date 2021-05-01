const router = require('express').Router();

const paramId = require('../validators/param.id');
const body = require('../validators/req.body.onCourse');
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const authenticate = require('../middlewares/auth/authenticate');
const create = require('../controllers/onCourse/create');
const update = require('../controllers/onCourse/update');
const getAll = require('../controllers/onCourse/getAll');
const deleteOne = require('../controllers/onCourse/delete');

router.get('/', asyncMiddleware(authenticate), asyncMiddleware(getAll));

router.post('/', asyncMiddleware(authenticate), body, asyncMiddleware(create));

router.put(
  '/:id',
  asyncMiddleware(authenticate),
  [paramId, body],

  asyncMiddleware(update),
);

router.delete(
  '/:id',
  asyncMiddleware(authenticate),
  paramId,
  asyncMiddleware(deleteOne),
);

module.exports = router;
