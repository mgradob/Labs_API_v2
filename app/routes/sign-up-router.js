/**
 * Created by mgradob on 11/2/16.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/sign-up-controller'),
    apiResponse = require('../utils/api-util').LabsJsonResponse;

router.route('/')
    .post(function (req, res) {
        controller.signUp(req.body, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

router.route('/:id_user')
    .get(function (req, res) {
        controller.getAllLabs(req.params.id_user, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    })
    .post(function (req, res) {
        controller.addSignUpRequest(req.params.id_user, req.body.labs, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

module.exports = router;