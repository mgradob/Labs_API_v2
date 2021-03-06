/**
 * Created by mgradob on 12/15/16.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../../controllers/admin/inventory-controller'),
    apiResponse = require('../../utils/api-util').LabsJsonResponse;

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

router.route('/:id_lab/:id_category')
    .get(function (req, res) {
        controller.getCategory(req.query.id_user, req.params.id_lab, req.params.id_category, function (result, data) {
            return res.json(apiResponse(result, data));
        })
    })
    .post(function (req, res) {
        controller.editCategory(req.query.id_user, req.params.id_lab, req.params.id_category, req.body, function (result, data) {
            return res.json(apiResponse(result, data));
        })
    })
    .delete(function (req, res) {
        controller.deleteCategory(req.query.id_user, req.params.id_lab, req.params.id_category, function (result, data) {
            return res.json(apiResponse(result, data));
        })
    });

module.exports = router;