import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

describe('ADD USERS', () => {
    describe('Add test users', () => {
        it('On success-1:: return status:201', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    username: 'abhishek',
                    email: 'abhishek@shek.com',
                    password: 'shkks123'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success-2:: return status:201', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    username: 'lumona',
                    email: 'lomona@mona.com',
                    password: 'lummmy'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success-3:: return status:201', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    username: 'zitry',
                    email: 'zitry@zit.com',
                    password: 'zimming'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });
});

// POST Users route tests
describe('USER SIGN UP TESTS', () => {
    describe('When a user sends a POST request to /api/v1/auth/signup', () => {
        it('if field(s) are empty:: return status:400', (done) => {
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
        it('On success:: return status:201', (done) => {
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
        it('if user details already exists:: return status:409', (done) => {
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
        it('On unique violation:: return status:500', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    username: 'jossyrammy',
                    email: 'jossy@rammy.com',
                    password: 'duRel20'
                })
                .end((req, res) => {
                    res.should.have.status(500);
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
        it('It should return a 401 status if Credentials do not match records', (done) => {
            chai.request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'rammy@jossy.com',
                    password: 'jossy1266'
                })
                .end((req, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
        it('It should return a 200 status if credentials match records', (done) => {
            chai.request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'rammy@jossy.com',
                    password: 'jossy1234'
                })
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

describe('USER DELETE ACCOUNT TESTS', () => {
    describe('When a user sends a DELETE request to /api/v1/auth/user/:username', () => {
        it('On success:: return status:200, msg:lumona has been deleted', (done) => {
            chai.request(app)
                .delete('/api/v1/auth/user/lumona')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'lumona has been deleted');
                    done();
                });
        });
        it('if user not found:: return status:404, msg:There was an error', (done) => {
            chai.request(app)
                .delete('/api/v1/auth/user/rammymossy@jossy.com')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'rammymossy@jossy.com does not exist');
                    done();
                });
        });
    });
});
