const Post = require('../models/Post.model');
const Like = require('../models/Like.model');
const Comment = require('../models/Comment.model');

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            console.log('graph fetch user---------------');
            let blog = await Post.query()
                .withGraphFetched('user')
                .withGraphFetched('likes');

            if (req.isAuthenticated()) {
                blog.forEach((post) => {
                    post.likes.forEach((like) => {
                        if (like.userId === req.user.id) {
                            post['is_liked'] = true;
                        }
                    });
                });
            }
            res.render('posts/index', {
                msg: 'List all blogs',
                title: 'Blog',
                blog,
            });
        } catch (error) {
            console.log(error);
        }
    },
    getSinglePost: async (req, res) => {
        const { id } = req.params;
        let post = await Post.query()
            .findById(id)
            .withGraphFetched('user')
            .withGraphFetched('likes');

        if (post.length === 0) {
            next(404);
            return;
        }

        if (req.isAuthenticated()) {
            post.likes.forEach((like) => {
                if (like.userId === req.user.id) {
                    post['is_liked'] = true;
                }
            });
        }

        let comments = await Comment.query()
            .where('postId', id)
            .withGraphFetched('user');
        res.render('posts/single', {
            title: post.title,
            blog: post,
            comments,
        });
    },
    insertSinglePost: (req, res) => {
        const { title, body } = req.body;
        const userId = req.user.id;
        Post.query()
            .insert({
                title,
                body,
                userId,
            })
            .then(() => {
                res.redirect('/blog');
            });
    },
    getPostCreateForm: (req, res) => {
        res.render('posts/create', {
            title: 'Blog | Create a blog',
        });
    },
    deleteSinglePost: (req, res) => {
        const { id } = req.params;
        console.log(id);
        Post.query()
            .deleteById(id)
            .then((id) => {
                res.json({ id: id });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    likePost: async (req, res) => {
        const { id } = req.params;
        console.log(id);
        try {
            const post = await Post.query().findById(id);
            console.log(post);
            const isLiked = await Like.query()
                .where('postId', id)
                .where('userId', req.user.id);

            console.log('isLiked', isLiked);
            if (isLiked.length === 0) {
                await Like.query().insert({
                    postId: id,
                    userId: req.user.id,
                });
                res.status(200).send();
            } else {
                await Like.query()
                    .delete()
                    .where('postId', id)
                    .where('userId', req.user.id);

                res.status(200).send();
            }
        } catch (error) {
            console.log('error in liking the post', error);
        }
    },
};
