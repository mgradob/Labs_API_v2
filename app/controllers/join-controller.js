/**
 * Created by mgradob on 1/3/17.
 */
var SignUpRequestModel = require('../models/sign-up-request'),
    response = require('../utils/api-util').labs_response;

module.exports.getJoinRequests = function (labId, callback) {
    SignUpRequestModel.find().exec(function (err, signUpRequests) {
        if (err) return callback(response.failed.generic);

        if (!signUpRequests) return callback(response.failed.no_data_found);

        return callback(response.success, signUpRequests);
    });
};