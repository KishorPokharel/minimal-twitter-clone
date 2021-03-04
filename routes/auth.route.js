const router = require('express').Router();
const passport = require('passport');

const {
    checkUserLoggedIn,
    checkUserNotLoggedIn,
} = require('../middlewares/auth.middleware');

router.get(
    '/google',
    checkUserNotLoggedIn,
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/logout', checkUserLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google',
    }),
    function (req, res) {
        res.redirect('/user/profile');
    }
);
module.exports = router;
