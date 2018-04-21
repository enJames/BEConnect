import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

// POST Users route tests
describe('USER SIGN UP TESTS', () => {
    describe('When a user sends a POST request to /api/v1/auth/signup', () => {
        it('It should return a 404 status if one (or more) fields are empty', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    username: 'jossyrammy',
                    email: '',
                    password: 'jossy1234'
                })
                .end((req, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('It should return a 201 status', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    username: 'jossyrammy',
                    email: 'rammy@jossy.com',
                    password: 'jossy1234'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('It should return the message "Your account has been created"', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    username: 'jossyrammy2',
                    email: 'rammyyy@jossy.com',
                    password: 'jossy1234'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Your account has been created');
                    done();
                });
        });
        it('It should return a 409 status if user details already exists', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    username: 'durella',
                    email: 'rammy@jossy.com',
                    password: 'duRel20'
                })
                .end((req, res) => {
                    res.should.have.status(409);
                    done();
                });
        });
    });
});

describe('USER LOGIN TESTS', () => {
    describe('When a user sends a POST request to /api/v1/auth/login', () => {
        it('It should return a 400 status if one (or more) fields are empty', (done) => {
            chai.request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: '',
                    password: 'jossy1234'
                })
                .end((req, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('It should return a 200 status if Credentials match records', (done) => {
            chai.request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'edith@mailings.com',
                    password: 'pass456'
                })
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('It should return the message "Welcome edith@mailings.com"', (done) => {
            chai.request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'edith@mailings.com',
                    password: 'pass456'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Welcome edith@mailings.com');
                    done();
                });
        });
        it('It should return a 401 status if credentials do not match', (done) => {
            chai.request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'edith@mailings.com',
                    password: 'pass45677'
                })
                .end((req, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });
});

describe('USER DELETE ACCOUNT TESTS', () => {
    describe('When a user sends a DELETE request to /api/v1/auth/user/:userId', () => {
        it('It should delete business and return a 200 status and the message "Account deleted"', (done) => {
            chai.request(app)
                .delete('/api/v1/auth/user/2')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'Account deleted');
                    done();
                });
        });
        it('It should return a 404 status and the message "There was an error" if user does not exist', (done) => {
            chai.request(app)
                .delete('/api/v1/auth/user/40')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'There was an error');
                    done();
                });
        });
    });
});
