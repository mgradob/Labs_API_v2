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
            message: 'Failed - Reason unknown'
        },
        no_data_found: {
            code: 201,
            message: 'Failed - No data found'
        },
        sign_up: {
            already_exists: {
                code: 211,
                message: 'User already exists'
            },
            no_data_found: {
                code: 212,
                message: 'User not found'
            }
        },
        sign_in: {
            missing_info: {
                code: 221,
                message: 'Missing username or password'
            },
            wrong_info: {
                code: 222,
                message: 'Incorrect username or password'
            }
        },
        home: {
            no_labs_accepted: {
                code: 231,
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
