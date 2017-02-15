/**
 * Created by mgradob on 11/22/16.
 */
module.exports.logi = function (title, body) {
   console.log('I-' + title + ': ' + body);
};

module.exports.logd = function (title, body) {
    console.log('D-' + title + ': ' + body);
};

module.exports.loge = function (title, body) {
    console.log('E-' + title + ': ' + body);
};