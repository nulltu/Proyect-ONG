const express = require('express');
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const authenticate = require('../middlewares/auth/authenticate');
const create = require('../controllers/inscriptions/create');
const remove = require('../controllers/inscriptions/delete');
const getAll = require('../controllers/inscriptions/getAll');
const getByUserId = require('../controllers/inscriptions/getByUserId');
const body = require('../validators/req.body.inscription');
const paramId = require('../validators/param.id');

const router = express.Router();

router.get('/', asyncMiddleware(authenticate), asyncMiddleware(getAll));
router.get(
  '/user/:id',
  asyncMiddleware(authenticate),
  paramId,
  asyncMiddleware(getByUserId),
);
router.post('/', asyncMiddleware(authenticate), body, asyncMiddleware(create));
router.delete(
  '/:id',
  asyncMiddleware(authenticate),
  paramId,
  asyncMiddleware(remove),
);
module.exports = router;
