const router = require('express').Router();

const { checkUserLoggedIn } = require('../middlewares/auth.middleware');

router.get('/profile', checkUserLoggedIn, (req, res) => {
    res.render('auth/profile', {
        title: 'Profile',
    });
});

module.exports = router;
