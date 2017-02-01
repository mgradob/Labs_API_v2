/**
 * Created by mgradob on 1/6/17.
 */
var UserModel = require('../models/user'),
    response = require('../utils/api-util').labs_response;

/**
 * Gets all available requests (carts) for this particular lab.
 * @param labId
 * @param callback
 */
module.exports.getAllRequests = function (labId, callback) {
    var filteredCarts = [];

    UserModel.find()
        .elemMatch('cart', {'lab_id': labId})
        .exec(function (err, users) {
            if (err) return callback(response.failed.generic);

            if (!users) return callback(response.failed.no_data_found);

            users.forEach(function (user) {
                filteredCarts.push({
                    full_name: user.full_name,
                    id_user: user.id_user
                })
            });

            return callback(response.success, filteredCarts);
        });
};

module.exports.getRequest = function (labId, userId, callback) {
    var cart = {
        full_name: '',
        id_user: '',
        cart: []
    };

    UserModel.findOne({id_user: userId}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.no_data_found);

        cart.full_name = user.full_name;
        cart.id_user = user.id_user;
        cart.cart = user.cart;

        return callback(response.success, cart);
    });
};