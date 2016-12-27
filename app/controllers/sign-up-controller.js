/**
 * Created by mgradob on 11/2/16.
 */
var UserModel = require('../models/user'),
    LabModel = require('../models/lab'),
    SignUpRequestModel = require('../models/sign-up-request'),
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
            mail: signUpInfo.id_user.toLowerCase() + '@itesm.mx',
            user_type: 'user',
            cart: [],
            borrowed: [],
            labs: [],
            history: []
        });

        newUser.save(function (err) {
            if (err) return callback(response.failed.generic);

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

        LabModel.find({campus: user.campus}, {_id: 0, id: 1, name: 1}, function (err, labs) {
            if (err) return callback(response.failed.generic);

            return callback(response.success, labs);
        });
    });
};

/**
 * Adds a request to join a lab or labs from an user.
 * @param userId
 * @param requestedLabs
 * @param callback
 */
module.exports.addSignUpRequest = function (userId, requestedLabs, callback) {
    UserModel.findOne({id_user: userId}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.sign_up.no_user_found);

        SignUpRequestModel.findOne({user_id: userId}, function (err, userSignUps) {
            if (err) return callback(response.failed.generic);

            if (!userSignUps) {
                var signUp = new SignUpRequestModel({
                    user_name: user.full_name,
                    user_id: user.id_user,
                    labs: []
                });

                requestedLabs.forEach(function (lab) {
                    signUp.labs.push({
                        lab_id: lab,
                        date_requested: Date.now()
                    })
                });

                signUp.save(function (err) {
                    if (err) return callback(response.failed.generic);

                    return callback(response.success);
                });
            } else {
                requestedLabs.forEach(function (lab) {
                    userSignUps.labs.forEach(function (alreadyRequestedLab) {
                        if (lab != alreadyRequestedLab.lab_id) {
                            userSignUps.labs.push({
                                lab_id: lab,
                                date_requested: Date.now()
                            })
                        }
                    });
                });

                userSignUps.save(function (err) {
                    if (err) return callback(response.failed.generic);

                    return callback(response.success);
                })
            }
        });
    });
};