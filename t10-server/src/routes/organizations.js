const router = require('express').Router();
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const image = require('../validators/image');
const paramId = require('../validators/param.id');
const body = require('../validators/req.body.organization');
const authenticate = require('../middlewares/auth/authenticate');
const roleAuth = require('../middlewares/auth/roleAuth');
const getOrgs = require('../controllers/organization/getOrgs');
const createOrg = require('../controllers/organization/createOrg');
const updateOrg = require('../controllers/organization/updateOrg');
const deleteOrg = require('../controllers/organization/deleteOrg');
const multer = require('../middlewares/multer/multer');

const upload = multer.single('image');

router.get('/', asyncMiddleware(getOrgs));

router.post(
  '/',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  upload,
  [image, body],
  asyncMiddleware(createOrg),
);

router.put(
  '/:id',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  upload,
  [paramId, image, body],
  asyncMiddleware(updateOrg),
);

router.delete(
  '/:id',
  asyncMiddleware(authenticate),
  roleAuth.onlyAdmin,
  paramId,
  asyncMiddleware(deleteOrg),
);

module.exports = router;
