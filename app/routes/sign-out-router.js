/**
 * Created by mgradob on 11/22/16.
 */
var express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    controller = require('../controllers/sign-out-controller'),
    authUtil = require('../utils/auth-util'),
    apiResponse = require('../utils/api-util').LabsJsonResponse;

router.use('/', authUtil.validateToken);
router.route('/')
    .post(passport.authenticate('jwt', {session: false}), function (req, res) {
        controller.signOut(req, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

module.exports = router;