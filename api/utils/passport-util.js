/**
 * Created by mgradob on 11/22/16.
 */
var secret = require('../../config').dbSecret,
    JwtStrategy = require('passport-jwt').Strategy,
    UserModel = require('../models/user');

module.exports = function (passport) {
    var opts = {};
    opts.secretOrKey = secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        UserModel.findOne({id: jwt_payload.id}, function (err, user) {
            if (err) return done(err, false);

            return !user ? done(null, false) : done(null, user);
        })
    }));
};