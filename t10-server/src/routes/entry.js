const { Router } = require('express');
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const authenticate = require('../middlewares/auth/authenticate');
const image = require('../validators/image');
const addEntry = require('../controllers/entry/addEntry');
const getAll = require('../controllers/entry/getAll');
const getTypes = require('../controllers/entry/getTypes');
const getEntryById = require('../controllers/entry/getById');
const update = require('../controllers/entry/update');
const deleteById = require('../controllers/entry/delete');
const bodyEntry = require('../validators/req.body.entries');
const { onlyAdmin } = require('../middlewares/auth/roleAuth');
const paramId = require('../validators/param.id');
const multer = require('../middlewares/multer/multer');

const upload = multer.single('image');
const router = Router();

router
  .get('/', asyncMiddleware(getAll))
  .get('/types', asyncMiddleware(getTypes))
  .post(
    '/',
    asyncMiddleware(authenticate),
    onlyAdmin,
    upload,
    [image, bodyEntry],
    asyncMiddleware(addEntry),
  )
  .get('/:id', paramId, asyncMiddleware(getEntryById))
  .put(
    '/:id',
    asyncMiddleware(authenticate),
    onlyAdmin,
    upload,
    [image, paramId, bodyEntry],
    asyncMiddleware(update),
  )
  .delete(
    '/:id',
    asyncMiddleware(authenticate),
    onlyAdmin,
    paramId,
    asyncMiddleware(deleteById),
  );

module.exports = router;
