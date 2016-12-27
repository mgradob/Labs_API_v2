/**
 * Created by mgradob on 12/15/16.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/inventory-controller'),
    apiResponse = require('../utils/api-util').LabsJsonResponse;

router.route('/:id_lab')
    .get(function (req, res) {
        controller.getInventoryOf(req.query.id_user, req.params.id_lab, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    })
    .post(function (req, res) {
        controller.postCategory(req.query.id_user, req.params.id_lab, req.body, function (result, data) {
            return res.json(apiResponse(result, data));
        })
    });

module.exports = router;