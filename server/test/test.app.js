import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

describe('SERVER TESTS', () => {
    describe('When a user visits "/"', () => {
        it('It should return a 200 status', (done) => {
            chai.request(app)
                .get('/')
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('It should return an object', (done) => {
            chai.request(app)
                .get('/')
                .end((req, res) => {
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('It should a message "Welcome to the start!"', (done) => {
            chai.request(app)
                .get('/')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Welcome to the start!', 'compare');
                    done();
                });
        });
    });
});

describe('POST BUSINESSES TESTS', () => {
    describe('When a user sends a POST request to "/businesses"', () => {
        it('It should return a 201 status', (done) => {
            chai.request(app)
                .get('/')
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('It should return an object', (done) => {
            chai.request(app)
                .get('/')
                .end((req, res) => {
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('Response message should equal "Registration successful!"', (done) => {
            chai.request(app)
                .get('/')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Registration successful!', 'compare');
                    done();
                });
        });
    });
});
