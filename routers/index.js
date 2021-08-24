const router = require('express').Router();
const newsPrefsRouter = require('./newsprefs');
const usersRouter = require('./users');
const newsRouter = require('./news');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const coronaRouter = require('./corona');
const weatherRouter = require('./weather');

router.use('/newsprefs', newsPrefsRouter);

router.use('/users', usersRouter);

router.use('/news', newsRouter);

router.use('/posts', postsRouter);

router.use('/comments', commentsRouter);

router.use('/corona', coronaRouter);

router.use('/weather', weatherRouter);

module.exports = router;
