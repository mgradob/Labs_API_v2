/**
 * Created by mgradob on 12/7/16.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/borrowed-controller'),
    apiResponse = require('../utils/api-util');

/**
 * URL: /borrowed/{id_user}
 */
router.route('/:id_user')
    .get(function (req, res) {
        controller.getBorrowed(req.params.id_user, function (result, data) {
            return res.json(apiResponse(result, data));
        });
    });

module.exports = router;