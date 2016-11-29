/**
 * Created by mgradob on 11/2/16.
 */
var UserModel = require('../models/user'),
    LabModel = require('../models/lab'),
    response = require('../utils/api-util').labs_response,
    async = require('async');

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
    var user = new UserModel({
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

    user.save(function (err) {
        if (err) return callback(response.failed.sign_up.already_exists);

        return callback(response.success);
    });
};

/**
 * Gets all the labs available for the requested user.
 * @param id_user of the requested user
 * @param callback
 */
module.exports.getAllLabs = function (id_user, callback) {
    UserModel.findOne({id_user: id_user})
        .exec(function (err, user) {
            if (err) return callback(response.failed.generic);

            if (!user) return callback(response.failed.sign_up.no_user_found);

        LabModel.find({campus: user.campus}, {_id: 0, id: 1, name: 1}, function (err, labs) {
            if (err) return callback(response.failed.generic);

            return callback(response.success, labs);
        });
    });
};

/**
 * Adds the user to each lab he requested to join.
 * @param id_user
 * @param labs
 * @param callback
 */
module.exports.addSignUpRequest = function (id_user, labs, callback) {
    UserModel.findOne({id_user: id_user}, function (err, user) {
        if (err) return callback(response.failed.generic);

            if (!user) return callback(response.failed.sign_up.no_user_found);


        var updates = [];
        LabModel.find({id: {$in: labs}}, function (err, labs) {
            labs.forEach(function (lab) {
                updates.push(function (callback) {
                    if (lab.sign_up_requests.length < 1) {
                        lab.sign_up_requests.push({
                            user_name: user.full_name,
                            user_id: user.id_user,
                            date_requested: Date.now()
                        });

                        lab.save(function () {
                            return callback(null, 'Saved');
                        });
                    } else {
                        lab.sign_up_requests.forEach(function (request) {
                            if (request.user_id != user.id_user) {
                                lab.sign_up_requests.push({
                                    user_name: user.full_name,
                                    user_id: user.id_user,
                                    date_requested: Date.now()
                                });

                                lab.save(function () {
                                    return callback(null, 'Saved');
                                });
                            } else {
                                return callback(null, 'Already exists on lab ' + lab.id);
                            }
                        });
                    }
                });
            });

            async.series(updates, function (err, result) {
                if (err) return callback(response.failed.generic);

                return callback(response.success);
            });
        });
};