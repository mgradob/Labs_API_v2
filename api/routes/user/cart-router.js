/**
 * Created by mgradob on 1/6/17.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../../controllers/user/cart-controller'),
    apiResponse = require('../../utils/api-util').LabsJsonResponse;

router.route('/:user_id')
    .get(function (req, res) {
        controller.getCart(req.params.user_id, function (result, data) {
            return res.json(apiResponse(result, data));

        })
    })
    .post(function (req, res) {
        controller.addCart(req.params.user_id, req.body, function (result, data) {
            return res.json(apiResponse(result, data));
        })
    })
    .put(function (req, res) {
        controller.addCart(req.params.user_id, req.body, function (result, data) {
            return res.json(apiResponse(result, data));
        })
    })
    .delete(function (req, res) {
        controller.deleteCart(req.params.user_id, function (result, data) {
            return res.json(apiResponse(result, data));
        })
    });

module.exports = router;