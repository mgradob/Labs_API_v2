/**
 * Created by mgradob on 11/22/16.
 */
var chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    server = require('../../app');

var signInController = require('../controllers/sign-in-controller'),
    response = require('../utils/api-util').labs_response;

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

    it('/signin endpoint should return a token', function () {
        var signInInfo = {
            id_user: 'test',
            password: 'test'
        };

        chai.request(server)
            .post('/signin')
            .send(signInInfo)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.code).to.equal(100);
                !expect(res.body.data).to.empty();

                done();
            });
    });
    
    it('/signout endpoint should log out user', function () {
        var token = '';

        chai.request(server)
            .post('/signout')
            .set('Authorization', 'Token ' + token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.code).to.equal(100);

                done();
            });
    })
});