const Post = require('../models/Post.model');

module.exports = {
    canDeletePost: (req, res, next) => {
        const { id } = req.params;
        Post.query()
            .findById(id)
            .then((post) => {
                if (post.userId === req.user.id) {
                    next();
                    return;
                }
                res.status(403).send();
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
