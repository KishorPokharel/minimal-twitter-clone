const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const redis = require('redis');
const connectRedis = require('connect-redis');
require('dotenv').config();

const helpers = require('./helpers');

const indexRouter = require('./routes/index.route');
const usersRouter = require('./routes/users.route');
const postsRouter = require('./routes/posts.route');
const authRouter = require('./routes/auth.route');
const commentRouter = require('./routes/comments.route');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.set('view engine', 'ejs');

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
});

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});

redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

require('./passport')(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.COOKIE_SECRET || 'keyboard cat shflsjlfjs',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
        maxAge: 1000 * 60 * 10,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.helper = helpers;
    res.locals.appURL = process.env.APP_URL;
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.currentPath = req.path;
    next();
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/blog', postsRouter);
app.use('/auth', authRouter);
app.use('/comments', commentRouter);

app.get('/test', function (req, res) {
    res.send(req.isAuthenticated());
});

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error', { title: 'Error occured' });
});

module.exports = app;
