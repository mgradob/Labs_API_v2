/**
 * Created by mgradob on 12/7/16.
 */
var UserModel = require('../models/user'),
    response = require('../utils/api-util').labs_response;

module.exports.getBorrowed = function (userId, callback) {
    UserModel.findOne({id_user: userId}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.no_data_found);

        // TODO
    })
};