var UserModel = require('../models/user'),
    response = require('../utils/api-util').labs_response;

/**
 * Gets all the users registered to a specifc lab.
 */
module.exports.getUsersOfLab = function(labId, callback) {
    UserModel.find().elemMatch("labs", {"id": labId}).exec(function(err, users){
        if (err) return callback(response.failed.generic);
        
        if (!users) return callback(response.failed.no_data_found);

        return callback(response.success, users);
    });
};

/**
 * Gets a specifc user by ID.
 */
module.exports.getUserOfLab = function(labId, userId, callback) {
    UserModel.findOne({id_user: userId}).elemMatch("labs", {"id": labId}).exec(function(err, users){
        if (err) return callback(response.failed.generic);
        
        if (!users) return callback(response.failed.no_data_found);

        return callback(response.success, users);
    });
};

/**
 * Editing user info is going to be limited to:
 * <ul>
 * <li>Full name</li>
 * <li>Credential ID</li>
 * <li>Career</li>
 * </ul>
 * 
 * Reasons:
 * <ul>
 * <li>Changing User ID is not possible because of uniqueness on ITESM system.</li>
 * <li>Changing password is handled by resetting password functionality.</li>
 * <li>Changing campus might lead to carts not being full cleared. User might, or might not, be allowed to change campus if cart is not empty.</li>
 * <li>Email is automatically binded to user ID.</li>
 * <li>Changing User Type is handled by changing user type functionality.</li>
 * <li>Changing Cart, Borrowed and Labs is handled by specific functionality.</li>
 * <li>History is not allowed to change.</li>
 * </ul>
 */
module.exports.editUser = function(labId, userId, newUserInfo, callback) {
    UserModel.findOne({labs: labId, id_user: userId}, function(err, user) {
        if (err) return callback(response.failed.generic);
        
        if (!user) return callback(response.failed.no_data_found);

        user.full_name = newUserInfo.full_name;
        user.id_credential = newUserInfo.id_credential;
        user.career = newUserInfo.career;

        user.save(function (err) {
            if (err) return callback(response.failed.generic);

            return callback(response.success);
        });
    });
};

/**
 * Deletes a specifc user.
 * 
 * Special considerations:
 * <ul>
 * <li>Cart, Borrowed items and History will be errased. This is not a light-take action. Be sure to warn admin about it.</li>
 * </ul>
 */
module.exports.deleteUser = function(labId, userId, callback) {
    UserModel.findOne({labs: labId, id_user: userId}, function(err, user) {
        if (err) return callback(response.failed.generic);
        
        if (!user) return callback(response.failed.no_data_found);

        user.remove(function(err) {
            if (err) return callback(response.failed.generic);

            return callback(response.success);
        });
    });
};