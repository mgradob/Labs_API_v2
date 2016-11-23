/**
 * Created by mgradob on 11/2/16.
 */
var UserModel = require('../models/user'),
    response = require('../utils/api-util').labs_response,
    logger = require('../utils/log-util'),
    authUtil = require('../utils/auth-util');

module.exports.signOut = function (user_id, callback) {
    return callback(response.failed.generic, null);
};