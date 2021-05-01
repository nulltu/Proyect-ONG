const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

const errorHandler = require('./middlewares/error/errorHandler');
const logErrors = require('./middlewares/error/logErrors');

const userRoute = require('./routes/users.js');
const organizationRoute = require('./routes/organizations');
const slidesRoute = require('./routes/slides');
const authRoute = require('./routes/auth');
const entriesRoute = require('./routes/entry');
const contactRoute = require('./routes/contact');
const coursesRoute = require('./routes/courses');
const onCourse = require('./routes/onCourse');
const inscriptionsRoute = require('./routes/inscriptions');
const themeRoute = require('./routes/theme');
const historyRoute = require('./routes/history');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

require('./middlewares/auth/jwt')(passport);

app.use('/users', userRoute);
app.use('/organization', organizationRoute);
app.use('/slides', slidesRoute);
app.use('/auth', authRoute);
app.use('/entries', entriesRoute);
app.use('/contact', contactRoute);
app.use('/courses', coursesRoute);
app.use('/oncourse', onCourse);
app.use('/inscription', inscriptionsRoute);
app.use('/theme', themeRoute);
app.use('/history', historyRoute);

app.use(logErrors);
app.use(errorHandler);

module.exports = app;
