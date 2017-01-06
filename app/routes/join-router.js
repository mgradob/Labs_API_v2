/**
 * Created by mgradob on 1/3/17.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/join-controller'),
    apiResponse = require('../utils/api-util').LabsJsonResponse;

router.route('/:id_lab')
    .get(function (req, res) {
        controller.getJoinRequests(req.params.id_lab, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

router.route('/:id_lab/:id_user')
    .post(function (req, res) {
        controller.acceptUserTo(req.params.id_lab, req.params.id_user, req.body, function(result, data) {
            return res.json(apiResponse(result, data));
        });
    })
    .delete(function (req, res) {
        controller.denyUserTo(req.params.id_lab, req.params.id_user, function (result, data) {
            return res.json(apiResponse(result, data));
        })
    });

module.exports = router;