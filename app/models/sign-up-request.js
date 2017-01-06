/**
 * Created by mgradob on 11/28/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LabRequestedSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    date_requested: {
        type: String,
        required: true
    }
});

var SignUpRequestSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    labs: [LabRequestedSchema]
});

module.exports = mongoose.model('SignUpRequest', SignUpRequestSchema);