const express = require('express');
const login = require('../controllers/auth/login');
const register = require('../controllers/auth/register');
const postPasswordRecovery = require('../controllers/auth/postPasswordRecovery');
const getPasswordRecovery = require('../controllers/auth/getPasswordRecovery');
const resetPassword = require('../controllers/auth/resetPassword');
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const bodyValidator = require('../validators/req.body.user');
const loginValidator = require('../validators/login.body');
const emailValidator = require('../validators/req.body.email');
const authenticateRefreshToken = require('../middlewares/auth/authenticate.refreshToken');
const authenticateToken = require('../middlewares/auth/authenticate');
const RefreshToken = require('../controllers/auth/refresh.token');
const { onlyAdmin } = require('../middlewares/auth/roleAuth');
const invalidateToken = require('../controllers/auth/invalidate.token');
const paramId = require('../validators/param.id');
const recaptcha = require('../validators/recaptcha');
const emailVerification = require('../controllers/auth/email.verification');
const sendEmailVerification = require('../controllers/auth/send.emailVerification');
const logout = require('../controllers/auth/logout');

const router = express.Router();

router.get('/password-recovery/:token', asyncMiddleware(getPasswordRecovery));
router.post('/password-recovery', asyncMiddleware(postPasswordRecovery));
router.post('/login', loginValidator, asyncMiddleware(login));
router.post('/register', [bodyValidator, recaptcha], asyncMiddleware(register));
router.post(
  '/refreshToken',
  asyncMiddleware(authenticateRefreshToken),
  asyncMiddleware(RefreshToken),
);
router.post('/reset-password', emailValidator, asyncMiddleware(resetPassword));
router.get(
  '/emailVerification',
  asyncMiddleware(authenticateToken),
  asyncMiddleware(emailVerification),
);
router.get(
  '/sendEmailVerification/:id',
  asyncMiddleware(authenticateToken),
  paramId,
  asyncMiddleware(sendEmailVerification),
);

router.delete(
  '/logout',
  asyncMiddleware(authenticateRefreshToken),
  asyncMiddleware(logout),
);

router.delete(
  '/invalidateToken/:id',
  asyncMiddleware(authenticateToken),
  onlyAdmin,
  paramId,
  asyncMiddleware(invalidateToken),
);

module.exports = router;
