const express = require('express');
const router = express.Router();

const PostController = require('../controllers/Post.controller');
const { checkUserLoggedIn } = require('../middlewares/auth.middleware');
const { canDeletePost } = require('../middlewares/post.middleware');
const Post = require('../models/Post.model');

router.get('/', PostController.getAllPosts);

router.post('/', PostController.insertSinglePost);

router.get('/create', checkUserLoggedIn, PostController.getPostCreateForm);

router.delete(
    '/:id',
    checkUserLoggedIn,
    canDeletePost,
    PostController.deleteSinglePost
);

router.post('/like/:id', checkUserLoggedIn, PostController.likePost);

router.get('/:id', PostController.getSinglePost);

module.exports = router;
