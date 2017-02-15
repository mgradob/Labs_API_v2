/**
 * Created by mgradob on 1/3/17.
 */
var UserModel = require('../../models/user'),
    SignUpRequestModel = require('../../models/sign-up-request'),
    response = require('../../utils/api-util').labs_response;

/**
 * Gets all available join requests for a lab.
 */
module.exports.getJoinRequests = function (labId, callback) {
    var joinRequests = [];

    SignUpRequestModel.find()
        .elemMatch("labs", {"id": labId})
        .exec(function (err, signUpRequests) {
            if (err) return callback(response.failed.generic);

            if (!signUpRequests) return callback(response.failed.no_data_found);

            signUpRequests.forEach(function (request) {
                var joinRequest = {
                    user_name: '',
                    user_id: '',
                    date_requested: 0
                };

                joinRequest.user_name = request.user_name;
                joinRequest.user_id = request.user_id;

                request.labs.forEach(function (lab) {
                    joinRequest.date_requested = lab.date_requested;
                });

                joinRequests.push(joinRequest);
            });

            return callback(response.success, joinRequests);
        });
};

/**
 * Accept a user into a lab.
 */
module.exports.acceptUserTo = function (labId, userId, lab, callback) {
    UserModel.findOne({id_user: userId}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.no_data_found);

        user.labs.push(lab);

        user.save(function (err) {
            if (err) return callback(response.failed.generic);

            SignUpRequestModel.findOne({user_id: userId}, function (err, joinRequest) {
                var index = -1;
                joinRequest.labs.forEach(function (requestLab) {
                    if (requestLab.id === lab.id) index = joinRequest.labs.indexOf(requestLab);
                });

                if (index < 0) return callback(response.failed.generic);

                joinRequest.labs.splice(index, 1);

                if (joinRequest.labs.length < 1) {
                    joinRequest.remove(function (err) {
                        if (err) return callback(response.failed.generic);

                        return callback(response.success);
                    })
                } else {
                    joinRequest.save(function (err) {
                        if (err) return callback(response.failed.generic);

                        return callback(response.success);
                    });
                }
            });
        });
    });
};

/**
 * Deny the user from accepting a lab.
 */
module.exports.denyUserTo = function (labId, userId, callback) {
    SignUpRequestModel.findOne({user_id: userId}, function (err, joinRequest) {
        var index = -1;
        joinRequest.labs.forEach(function (requestLab) {
            if (requestLab.id === labId) index = joinRequest.labs.indexOf(requestLab);
        });

        if (index < 0) return callback(response.failed.generic);

        joinRequest.labs.splice(index, 1);

        if (joinRequest.labs.length < 1) {
            joinRequest.remove(function (err) {
                if (err) return callback(response.failed.generic);

                return callback(response.success);
            })
        } else {
            joinRequest.save(function (err) {
                if (err) return callback(response.failed.generic);

                return callback(response.success);
            });
        }
    });
};