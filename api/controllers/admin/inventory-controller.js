/**
 * Created by mgradob on 12/13/16.
 */
var LabModel = require('../../models/lab'),
    UserModel = require('../../models/user'),
    response = require('../../utils/api-util').labs_response;

module.exports.getInventoryOf = function (userId, labId, callback) {
    UserModel.findOne({id_user: userId}, function(err, user) {
        if (err) return callback(response.failed.generic);

        if (!user) return callback(response.failed.no_data_found);

        if(user.user_type === 'admin') {
            LabModel.findOne({id: labId, admin_id: userId}, function (err, lab) {
                if (err) return callback(response.failed.generic);

                if (!lab) return callback(response.failed.no_data_found);

                return callback(response.success, lab.categories);
            });
        } else {
            LabModel.findOne({id: labId}, function (err, lab) {
                if (err) return callback(response.failed.generic);

                if (!lab) return callback(response.failed.no_data_found);

                return callback(response.success, lab.categories);
            });
        }
    });    
};

module.exports.getCategory = function (userId, labId, categoryId, callback) {
    LabModel.findOne({id: labId, admin_id: userId}, function (err, lab) {
        if (err) return callback(response.failed.generic);

        if (!lab) return callback(response.failed.no_data_found);

        return callback(response.success, lab.categories[categoryId]);
    });
};

module.exports.postCategory = function (userId, labId, newCategory, callback) {
    LabModel.findOne({id: labId, admin_id: userId}, function (err, lab) {
        if (err) return callback(response.failed.generic);

        if (!lab) return callback(response.failed.no_data_found);

        lab.categories.forEach(function (category) {
            if (category.id === newCategory.id || category.name.toLowerCase() === newCategory.name.toLowerCase()) {
                return callback(response.failed.inventory.category_already_exists);
            }
        });

        if (lab.categories.length < 1) newCategory.id = 0;
        else newCategory.id = lab.categories[lab.categories.length - 1].id + 1;

        if (newCategory.items) {
            newCategory.items.forEach(function (item) {
                item.id = (newCategory.id * 1000) + newCategory.items.indexOf(item);
            });
        }

        lab.categories.push(newCategory);

        lab.save(function (err) {
            if (err) return callback(response.failed.generic);

            return callback(response.success, newCategory);
        })
    });
};

module.exports.editCategory = function (userId, labId, categoryId, editedCategory, callback) {
    LabModel.findOne({id: labId, admin_id: userId}, function (err, lab) {
        if (err) return callback(response.failed.generic);

        if (!lab) return callback(response.failed.no_data_found);

        if (editedCategory.items) {
            editedCategory.items.forEach(function (item) {
                item.id = (editedCategory.id * 1000) + editedCategory.items.indexOf(item);
            })
        }

        lab.categories[categoryId] = editedCategory;

        lab.save(function (err) {
            if (err) return callback(response.failed.generic);

            return callback(response.success);
        })
    });
};

module.exports.deleteCategory = function (userId, labId, categoryId, callback) {
    LabModel.findOne({id: labId, admin_id: userId}, function (err, lab) {
        if (err) return callback(response.failed.generic);

        if (!lab) return callback(response.failed.no_data_found);

        lab.categories.splice(categoryId, 1);

        lab.save(function (err) {
            if (err) return callback(response.failed.generic);

            return callback(response.success);
        })
    });
};