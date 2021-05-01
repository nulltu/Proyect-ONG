const express = require('express');
const getAll = require('../controllers/history/getAll');
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const paramId = require('../validators/param.id');
const authenticate = require('../middlewares/auth/authenticate');
const create = require('../controllers/history/create');
const remove = require('../controllers/history/delete');
const update = require('../controllers/history/update');
const roleAuth = require('../middlewares/auth/roleAuth');
const multer = require('../middlewares/multer/multer');
const image = require('../validators/image');

const upload = multer.single('image');

const router = express.Router();

router.get('/', asyncMiddleware(getAll));
router.post(
  '/',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  upload,
  image,
  asyncMiddleware(create),
);
router.put(
  '/:id',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  upload,
  image,
  paramId,
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
