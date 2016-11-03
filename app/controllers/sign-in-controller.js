/**
 * Created by mgradob on 11/2/16.
 */
var jwt = require('jwt-simple'),
    UserModel = require('../models/user'),
    response = require('../utils/api-utils').labs_response,
    secret = require('../config').dbSecret;

/**
 * Signs in an user, based on the post info.
 * @param signInInfo body:
 * <ul>
 * <li>id_user: id of the user (i.e. A01234567)
 * <li>password: user´s password
 * </ul>
 * @param callback used to talk to the router
 * @returns {*}
 */
module.exports.signIn = function (signInInfo, callback) {
    if (!signInInfo || signInInfo.id_user === '' || signInInfo.password === '') return callback(response.failed.missing_info);

    UserModel.findOne({id_user: signInInfo.id_user})
        .exec(function (err, user) {
            if (err) return callback(response.failed.generic);

            user.comparePassword(signInInfo.password, function (err, match) {
                if (match && !err) {
                    var token = jwt.encode(user.id_user, secret);

                    return callback(response.success, {
                        token: 'JWT ' + token
                    });
                } else return callback(response.failed.sign_in.wrong_info);
            });
        });
};