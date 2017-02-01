/**
 * Created by mgradob on 1/9/17.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/account-controller'),
    apiResponse = require('../utils/api-util').LabsJsonResponse;

router.route('/')
    .get(function (req, res) {
        controller.getAccountInfo(req.query.id_user, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

module.exports = router;