require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/User.model');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL,
            },
            async function (accessToken, refreshToken, profile, cb) {
                console.log('----------Profile: ---------', profile);
                let user = await User.query().where('googleId', profile.id);

                if (user && user.length != 0) {
                    console.log('querying user and found', user);
                    return cb(null, user[0]);
                } else {
                    user = await User.query().insert({
                        googleId: profile.id,
                        email: profile._json.email,
                        name: profile._json.name,
                    });
                    console.log('not found inserting', user);
                    return cb(null, user);
                }
            }
        )
    );

    passport.serializeUser(function (user, done) {
        console.log('Serializing', user);
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.query()
            .findById(id)
            .then((user) => {
                console.log('deserialized', user);
                done(null, user);
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
