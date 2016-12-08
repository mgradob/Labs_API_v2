/**
 * Created by mgradob on 10/26/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ComponentSchema = new Schema({
    id_component: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    note: String,
    total: {
        type: Number,
        required: true
    },
    available: {
        type: Number,
        required: true
    }
});

var CategorySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    components: [ComponentSchema]
});

var RequestSchema = new Schema({
    student_name: {
        type: String,
        required: true
    },
    student_id: {
        type: String,
        required: true
    },
    date_requested: {
        type: Date,
        required: true
    }
    //TODO review model
});

var LabSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    admin_id: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    categories: [CategorySchema],
    requests: [RequestSchema]
});

module.exports = mongoose.model('Lab', LabSchema);