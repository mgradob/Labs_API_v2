var UserModel = require('../models/user'),
    LabModel = require('../models/lab'),
    response = require('../utils/api-utils').labs_response;

var adminHomeResponse = {};

var studentHomeResponse = {
    cart: [],
    borrowed: [],
    labs: [],
    history: []
};

module.exports.getUserHome = function (userId, callback) {
    UserModel.findOne({
        'id_user': userId
    })
        .exec(function (err, student) {
            if (err) return callback(response.failed.generic);

            if (student.is_admin) {
                return callback(response.not_implemented_yet);
            } else {
                studentHomeResponse.cart = student.cart;
                studentHomeResponse.borrowed = student.borrowed;
                studentHomeResponse.history = student.history;

                LabModel.find({
                    'id': {
                        $in: student.labs
                    }
                }, {
                    '_id': 0,
                    'name': 1,
                    'categories': 1
                })
                    .exec(function (err, labs) {
                        if (err) return callback(response.failed.generic);

                        if (labs.length === 0) return callback(response.failed.home.no_labs_accepted);

                        studentHomeResponse.labs = labs;

                        return callback(response.success, studentHomeResponse);
                    });
            }
        });
};
