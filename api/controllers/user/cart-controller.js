/**
 * Created by mgradob on 1/6/17.
 */
var UserModel = require('../../models/user'),
    response = require('../../utils/api-util').labs_response;

module.exports.getCart = function(userId, callback) {
    UserModel.findOne({id_user: userId}, function (err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.no_data_found);

        return callback(response.success, user.cart);
    });
};

module.exports.addCart = function(userId, cart, callback) {
    UserModel.findOne({id_user:userId}, function(err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.no_data_found);

        user.cart = cart;

        user.save(function(err) {
            if (err) return callback(response.failed.generic);

            return callback(response.success);
        });
    });
};

module.exports.deleteCart = function(userId, callback) {
    UserModel.findOne({id_user:userId}, function(err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.no_data_found);

        user.cart = [];

        user.save(function(err) {
            if (err) return callback(response.failed.generic);

            return callback(response.success);
        });
    });
};