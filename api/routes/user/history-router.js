/**
 * Created by mgradob on 2/14/17.
 */
var express = require('express'),
    router = express.Router(),
    controller = require('../../controllers/user/history-controller'),
    apiResponse = require('../../utils/api-util').LabsJsonResponse;

router.route('/:user_id')
    .get(function (req, res) {
        controller.getHistory(req.params.user_id, function (result, data) {
            return res.json(apiResponse(result, data));

        })
    });

module.exports = router;