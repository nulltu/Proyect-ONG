const router = require('express').Router();

const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const authenticate = require('../middlewares/auth/authenticate');
const { onlyAdmin } = require('../middlewares/auth/roleAuth');
const body = require('../validators/req.body.slides');
const paramId = require('../validators/param.id');
const multer = require('../middlewares/multer/multer');
const image = require('../validators/image');
const getSlides = require('../controllers/slides/getSlides');
const createSlide = require('../controllers/slides/createSlide');
const updateSlide = require('../controllers/slides/updateSlide');
const deleteSlide = require('../controllers/slides/deleteSlide');

const upload = multer.single('image');

router.get('/', asyncMiddleware(getSlides));

router.post(
  '/',
  asyncMiddleware(authenticate),
  onlyAdmin,
  upload,
  image,
  body,
  asyncMiddleware(createSlide),
);

router.put(
  '/:id',
  asyncMiddleware(authenticate),
  onlyAdmin,
  paramId,
  body,
  asyncMiddleware(updateSlide),
);

router.delete(
  '/:id',
  asyncMiddleware(authenticate),
  onlyAdmin,
  paramId,
  asyncMiddleware(deleteSlide),
);

module.exports = router;
