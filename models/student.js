/**
 * Created by mgradob on 10/26/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('Student', new Schema({
    id_student: String,
    name: String,
    last_name_1: String,
    last_name_2: String,
    id_credential: Number,
    career: String,
    mail: String,
    labs: [String],
    is_admin: Boolean
}));