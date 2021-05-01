const express = require('express');
const getAll = require('../controllers/user/getAll');
const getById = require('../controllers/user/getById');
const getRoles = require('../controllers/user/getRoles');
const post = require('../controllers/user/post');
const put = require('../controllers/user/put');
const putAdmin = require('../controllers/user/putAdmin');
const remove = require('../controllers/user/delete');
const imageDelete = require('../controllers/user/imageDelete');
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const paramId = require('../validators/param.id');
const body = require('../validators/req.body.user');
const bodyUpdate = require('../validators/req.body.user.update');
const bodyUpdateAdmin = require('../validators/req.body.user.update.admin');
const authenticate = require('../middlewares/auth/authenticate');
const roleAuth = require('../middlewares/auth/roleAuth');
const image = require('../validators/image');
const multer = require('../middlewares/multer/multer');

const upload = multer.single('image');
const router = express.Router();

router.get(
  '/',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  asyncMiddleware(getAll),
);

router.get(
  '/roles',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  asyncMiddleware(getRoles),
);

router.get(
  '/:id',
  asyncMiddleware(authenticate),
  paramId,
  asyncMiddleware(roleAuth.onlySelfData),
  asyncMiddleware(getById),
);

router.post(
  '/',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  body,
  asyncMiddleware(post),
);

router.put(
  '/',
  asyncMiddleware(authenticate),
  upload,
  [image, bodyUpdate],
  asyncMiddleware(put),
);

router.put(
  '/:id',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  [paramId, bodyUpdateAdmin],
  asyncMiddleware(putAdmin),
);

router.delete(
  '/image',
  asyncMiddleware(authenticate),
  asyncMiddleware(imageDelete),
);

router.delete(
  '/:id',
  asyncMiddleware(authenticate),
  roleAuth.onlySelfData,
  paramId,
  asyncMiddleware(remove),
);

module.exports = router;
