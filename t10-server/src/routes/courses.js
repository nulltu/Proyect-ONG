const express = require('express');
const paramId = require('../validators/param.id');
const body = require('../validators/req.body.courses');
const image = require('../validators/image');
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const authenticate = require('../middlewares/auth/authenticate');
const { onlyAdmin } = require('../middlewares/auth/roleAuth');
const post = require('../controllers/courses/post');
const put = require('../controllers/courses/put');
const getAll = require('../controllers/courses/getAll');
const getById = require('../controllers/courses/getById');
const remove = require('../controllers/courses/remove');
const multer = require('../middlewares/multer/multer');

const upload = multer.single('image');
const router = express.Router();

router.get('/', asyncMiddleware(getAll));

router.get('/:id', paramId, asyncMiddleware(getById));

router.post(
  '/',
  asyncMiddleware(authenticate),
  onlyAdmin,
  upload,
  [image, body],
  asyncMiddleware(post),
);

router.put(
  '/:id',
  asyncMiddleware(authenticate),
  onlyAdmin,
  upload,
  [paramId, image, body],
  asyncMiddleware(put),
);

router.delete(
  '/:id',
  asyncMiddleware(authenticate),
  onlyAdmin,
  paramId,
  asyncMiddleware(remove),
);

module.exports = router;
