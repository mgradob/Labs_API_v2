var express = require('express'),
    router = express.Router(),
    controller = require('../../controllers/admin/users-controller'),
    apiResponse = require('../../utils/api-util').LabsJsonResponse;

router.route('/:id_lab')
    .get(function (req, res) {
        controller.getUsersOfLab(req.params.id_lab, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

router.route('/:id_lab/:id_user')
    .get(function (req, res) {
        controller.getUserOfLab(req.params.id_lab, req.params.id_user, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    })
    .post(function (req, res) {
        controller.editUser(req.params.id_lab, req.params.id_user, req.body, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    })
    .delete(function (req, res) {
        controller.deleteUser(req.params.id_lab, req.params.id_user, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

module.exports = router;