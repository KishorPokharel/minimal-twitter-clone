const { NotExtended } = require('http-errors');

const router = require('express').Router();

const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');
const { checkUserLoggedIn } = require('../middlewares/auth.middleware');

router.post('/:postId', checkUserLoggedIn, async (req, res) => {
    const { postId } = req.params;

    const { comment } = req.body;

    let post = await Post.query().findById(postId);

    if (post.length === 0) {
        res.status(404);
        next();
        return;
    }
    const userId = req.user.id;
    Comment.query()
        .insert({
            body: comment,
            userId,
            postId,
        })
        .then(() => {
            res.redirect('/blog/' + postId);
        });
});

module.exports = router;
