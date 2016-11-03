/**
 * Created by mgradob on 11/2/16.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/sign-in-controller'),
    apiResponse = require('../utils/api-utils').LabsJsonResponse;

router.route('/')
    .post(function (req, res) {
        controller.signIn(req.body, function (result, data) {
            return res.json(apiResponse(result, data));
        })
    });

module.exports = router;

