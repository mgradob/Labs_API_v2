/**
 * Created by mgradob on 11/2/16.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/home-controller'),
    apiResponse = require('../utils/api-util').LabsJsonResponse;

router.route('/:id_user/')
    .get(function (req, res) {
        controller.getUserHome(req.params.id_user, req.query.lab_id, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

module.exports = router;
