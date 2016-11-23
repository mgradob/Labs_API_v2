/**
 * Created by mgradob on 11/22/16.
 */
var chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    server = require('../../app');

var signInController = require('../controllers/sign-in-controller'),
    signInRouter = require('../routes/sign-in-router').
    response = require('../utils/api-utils').labs_response;

chai.use(chaiHttp);

describe('SignIn', function () {
    it('signIn() should return a token', function () {
        var signInInfo = {
            id_user: 'test',
            password: 'test'
        };

        signInController.signIn(signInInfo, function (result, data) {
            expect(result).to.equal(response.success.code);
            expect(data).to.not.null();
            expect(data).to.not.empty();
        });
    });

    it('/signIn endpoint should return a token', function () {
        var signInInfo = {
            id_user: 'test',
            password: 'test'
        };

        chai.request(server)
            .post('/signin')
            .send(signInInfo)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.not.null();

                done();
            });
    });
});