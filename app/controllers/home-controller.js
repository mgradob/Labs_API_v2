/**
 * Created by mgradob on 11/2/16.
 */
var UserModel = require('../models/user'),
    LabModel = require('../models/lab'),
    SignUpRequests = require('../models/sign-up-request'),
    response = require('../utils/api-util').labs_response;

var adminHomeResponse = {
    signUpRequests: [],
    requests: [],
    categories: [],
    users: []
};

var studentHomeResponse = {
    cart: [],
    borrowed: [],
    labs: [],
    history: []
};

/**
 * Gets the home information for the requested user.
 * @param userId of the requested user
 * @param callback
 */
module.exports.getUserHome = function (userId, labId, callback) {
    adminHomeResponse = {
        signUpRequests: [],
        requests: [],
        categories: [],
        users: []
    };
    studentHomeResponse = {
        cart: [],
        borrowed: [],
        labs: [],
        history: []
    };

    UserModel.findOne({id_user: userId}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.no_data_found);

        if (user.user_type === 'admin') {
            LabModel.findOne({id: labId}, function (err, lab) {
                if (err) return callback(response.failed.generic);

                if (!lab) return callback(response.failed.no_data_found);

                adminHomeResponse.requests = lab.requests;

                lab.categories.forEach(function (category) {
                    adminHomeResponse.categories.push(category.name);
                });

                UserModel.find({labs: lab.id}, function (err, users) {
                    if (err) return callback(response.failed.generic);

                    adminHomeResponse.users = users != null ? users : [];

                    SignUpRequests.find({labs: lab.id}, {
                        _id: 0,
                        user_name: 1,
                        user_id: 1
                    }, function (err, signUpRequests) {
                        if (err) return callback(response.failed.generic);

                        adminHomeResponse.signUpRequests = signUpRequests != null ? signUpRequests : [];

                        return callback(response.success, adminHomeResponse);
                    });
                });
            });
        } else {
            studentHomeResponse.cart = user.cart.slice(0, 3);
            studentHomeResponse.borrowed = user.borrowed.slice(0, 3);
            studentHomeResponse.history = user.history.slice(0, 3);

            var labsIds = [];
            user.labs.forEach(function (lab) {
                labsIds.push(lab.id);
            });

            LabModel.find({id: { $in: labsIds}}, {name: 1, categories: 1}, function (err, labs) {
                if (err) return callback(response.failed.generic);

                if (!labs) return callback(response.failed.no_data_found);

                studentHomeResponse.labs = labs.slice(0, 3);

                return callback(response.success, studentHomeResponse);
            });
        }
    });
};
