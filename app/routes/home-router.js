var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/home-controller'),
    apiResponse = require('../utils/api-utils').LabsJsonResponse;

router.route('/:id_user')
    .get(function (req, res) {
        controller.getUserHome(req.params.id_user, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

module.exports = router;
