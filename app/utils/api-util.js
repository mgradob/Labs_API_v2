module.exports.LabsJsonResponse = function (result, data) {
    return {
        status: result.code,
        message: result.message,
        data: data
    }
};

module.exports.labs_response = {
    success: {
        code: 100,
        message: 'Success'
    },
    failed: {
        generic: {
            code: 200,
            message: 'Failed - Reason Unknown'
        },
        sign_up: {
            already_exists: {
                code: 201,
                message: 'User already exists'
            },
            no_user_found: {
                code: 202,
                message: 'User not found'
            }
        },
        sign_in: {
            missing_info: {
                code: 211,
                message: 'Missing username or password'
            },
            wrong_info: {
                code: 212,
                message: 'Incorrect username or password'
            }
        },
        home: {
            no_labs_accepted: {
                code: 221,
                message: 'User hasn\'t been accepted to a lab yet'
            }
        }
    },
    not_implemented_yet: {
        code: 300,
        message: 'Not implemented yet'
    },
    auth_failed: {
        no_token_provided: {
            code: 400,
            message: 'No token provided'
        },
        token_expired: {
            code: 401,
            message: 'Token expired'
        }
    }
};
