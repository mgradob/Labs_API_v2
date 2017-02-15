/**
 * Created by mgradob on 1/6/17.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/requests-controller'),
    apiResponse = require('../utils/api-util').LabsJsonResponse;

router.route('/:id_lab')
    .get(function (req, res) {
        controller.getAllRequests(req.params.id_lab, function (result, data) {
            return res.json(apiResponse(result, data));

        })
    });

router.route('/:id_lab/:id_user')
    .get(function (req, res) {
        controller.getRequest(req.params.id_lab, req.params.id_user, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

module.exports = router;