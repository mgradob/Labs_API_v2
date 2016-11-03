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
        home: {
            no_labs_accepted: {
                code: 201,
                message: 'User hasn\'t been accepted to a lab yet'
            }
        }
    },
    not_implemented_yet: {
        code: 300,
        message: 'Not implemented yet'
    }
}
