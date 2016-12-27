/**
 * Created by mgradob on 11/2/16.
 */
var UserModel = require('../models/user'),
    response = require('../utils/api-util').labs_response,
    logger = require('../utils/log-util'),
    authUtil = require('../utils/auth-util');

/**
 * Signs in an user, based on the post info.
 */
module.exports.signIn = function (signInInfo, callback) {
    if (!signInInfo || !signInInfo.id_user || !signInInfo.password) return callback(response.failed.sign_in.missing_info);

    UserModel.findOne({id_user: signInInfo.id_user}, function (err, user) {
        if (err) return callback(response.failed.generic);

        user.comparePassword(signInInfo.password, function (err, match) {
            if (match && !err) {
                var token = authUtil.generateToken(user.user_id);

                logger.logi('Sign In', 'Token: ' + token);

                var responseData;

                responseData = {
                    token: 'JWT ' + token,
                    user: {
                        id_user: user.id_user,
                        full_name: user.full_name,
                        career: user.career,
                        campus: user.campus,
                        mail: user.mail,
                        labs: user.labs,
                        user_type: user.user_type
                    }
                };

                return callback(response.success, responseData);
            } else return callback(response.failed.sign_in.wrong_info);
        });
    });
};
