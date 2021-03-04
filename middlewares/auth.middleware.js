module.exports = {
    checkUserLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/auth/google');
        }
    },

    checkUserNotLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            return next();
        }
    },
};
