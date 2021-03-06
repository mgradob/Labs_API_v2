/**
 * Created by mgradob on 10/26/16.
 */
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var CartSchema = new Schema({
    lab_id: {
        type: String,
        required: true
    },
    lab_name: String,
    component_id: {
        type: Number,
        required: true
    },
    component_name: {
        type: String,
        required: true
    },
    component_description: String,
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
    date_requested: {
        type: Date,
        required: true
    }
});

var BorrowedSchema = new Schema({
    component_name: {
        type: String,
        required: true
    },
    component_description: String,
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 3
    },
    date_requested: {
        type: Date,
        required: true
    },
    lab_id: {
        type: String,
        requred: true
    }
});

var HistorySchema = new Schema({
    component_name: {
        type: String,
        required: true
    },
    component_description: String,
    date_out: {
        type: Date,
        required: true
    },
    date_in: Date
});

var LabSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

/**
 * user_type: admin, subadmin, user
 */
var UserSchema = new Schema({
    id_user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    id_credential: {
        type: Number,
        default: 0
    },
    career: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    cart: [CartSchema],
    borrowed: [BorrowedSchema],
    labs: [LabSchema],
    history: [HistorySchema]
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        })
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, match) {
        if (err) return callback(err);

        callback(null, match);
    });
};

module.exports = mongoose.model('User', UserSchema);
