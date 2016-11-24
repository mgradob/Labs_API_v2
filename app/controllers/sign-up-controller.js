/**
 * Created by mgradob on 11/2/16.
 */
var UserModel = require('../models/user'),
    LabModel = require('../models/lab'),
    response = require('../utils/api-util').labs_response;

/**
 * Creates a user with default params.
 * @param signUpInfo body:
 * <ul>
 * <li>id_user
 * <li>password
 * <li>full_name
 * <li>career
 * <li>campus
 * </ul>
 * @param callback
 */
module.exports.signUp = function (signUpInfo, callback) {
    UserModel.findOne({id_user: signUpInfo.id_user}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (user) return callback(response.failed.sign_up.already_exists);

        var newUser = new UserModel({
            id_user: signUpInfo.id_user,
            password: signUpInfo.password,
            full_name: signUpInfo.full_name,
            id_credential: 0,
            career: signUpInfo.career,
            campus: signUpInfo.campus,
            mail: signUpInfo.id_user + '@itesm.mx',
            cart: [],
            borrowed: [],
            labs: [],
            history: []
        });

        newUser.save(function (err) {
            if (err) return callback(response.failed.sign_up.already_exists);

            return callback(response.success);
        });

    });
};

/**
 * Gets all the labs available for the requested user.
 * @param id_user of the requested user
 * @param callback
 */
module.exports.getAllLabs = function (id_user, callback) {
    UserModel.findOne({id_user: id_user}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.sign_up.no_user_found);

        LabModel.find({campus: user.campus}, {_id: 0, id: 1, name: 1})
            .exec(function (err, labs) {
                if (err) return callback(response.failed.generic);

                return callback(response.success, labs);
            });
    });
};

/**
 * Updates the labs for the requested user. Used only on the sign up.
 * @param id_user of the user to update
 * @param addLabsInfo body:
 * <ul>
 * <li> [labs_id]: an array of the labs ids (i.e. [elec, herr, mech])
 * </ul>
 * @param callback
 */
module.exports.addLabs = function (id_user, addLabsInfo, callback) {
    UserModel.findOne({id_user: id_user}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.sign_up.no_user_found);

        user.labs = addLabsInfo.labs;

        user.save(function (err) {
            if (err) return callback(response.failed.generic);

            return callback(response.success);
        });
    });
};