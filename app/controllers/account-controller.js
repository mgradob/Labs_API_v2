/**
 * Created by mgradob on 1/9/17.
 */
var UserModel = require('../models/user'),
    response = require('../utils/api-util').labs_response;

module.exports.getAccountInfo = function (userId, callback) {
    UserModel.findOne({id_user: userId}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.no_data_found);

        return callback(response.success, user);
    });
};