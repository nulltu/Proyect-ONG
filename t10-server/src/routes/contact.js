const express = require('express');
const post = require('../controllers/contact/post');
const asyncMiddleware = require('../middlewares/error/asyncMiddleware');
const body = require('../validators/req.body.contact');

const router = express.Router();

router.post('/', body, asyncMiddleware(post));

module.exports = router;
