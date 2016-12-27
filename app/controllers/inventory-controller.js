/**
 * Created by mgradob on 12/13/16.
 */
var LabModel = require('../models/lab'),
    response = require('../utils/api-util').labs_response;

module.exports.getInventoryOf = function (userId, labId, callback) {
    LabModel.findOne({id: labId, admin_id: userId}, function (err, lab) {
        if (err) return callback(response.failed.generic);

        if (!lab) return callback(response.failed.no_data_found);

        return callback(response.success, lab.categories);
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
        else newCategory.id = lab.categories[lab.categories.length -1].id;
        lab.categories.push(newCategory);

        lab.save(function (err) {
            if (err) return callback(response.failed.generic);

            return callback(response.success, newCategory);
        })
    });
};