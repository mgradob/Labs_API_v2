/**
 * Created by mgradob on 11/22/16.
 */
var jwt = require('jwt-simple'),
    secret = require('../../config').dbSecret,
    moment = require('moment'),
    apiResponse = require('../utils/api-util').LabsJsonResponse,
    response = require('../utils/api-util').labs_response;

module.exports.generateToken = function (username) {
    return jwt.encode({
        user_id: username,
        exp: moment().add(1, 'days').valueOf()
    }, secret);
};

module.exports.decodeToken = function (token) {
    return jwt.decode(token, secret);
};

module.exports.getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');

        return parted.length === 2 ? parted[1] : null;
    } else return null;
};

module.exports.validateToken = function (req, res, next) {
    var token = exports.decodeToken(exports.getToken(req.headers));

    if (token) {
        if (token.exp <= Date.now()) {
            return res.json(apiResponse(response.auth_failed.token_expired, null));
        }

        next();
    } else {
        return res.json(apiResponse(response.auth_failed.no_token_provided, null));
    }
};