import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

// POST Reviews route tests
describe('CREATE REVIEWS TESTS', () => {
    describe('When a user sends a POST request to /api/v1/businesses/:businessId/reviews', () => {
        it('It should return a 201 status', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/3/reviews')
                .send({
                    reviewer: 'Jossy Balliard',
                    review: 'This is a post review test'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('It should return an object', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/4/reviews')
                .send({
                    reviewer: 'Anselem Pete',
                    review: 'This is another post review test'
                })
                .end((req, res) => {
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('Response message should equal "Review posted!"', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/4/reviews')
                .send({
                    reviewer: 'Jazril spaniard',
                    review: 'This is just yet, another post review test'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Review posted!');
                    done();
                });
        });
        it('It should return a 400 if a field is not set."', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/1/reviews')
                .send({
                    reviewer: 'Moritz Scorn',
                    review: ''
                })
                .end((req, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('It should return a message "Fill out all fields" if a field (or more) is/are not set', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/1/reviews')
                .send({
                    reviewer: 'Moritz Scorn',
                    review: ''
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Fill out all fields');
                    done();
                });
        });
        it('It should return a 404 if business does not exist or have no reviews."', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/40/reviews')
                .send({
                    reviewer: 'Moritz Scorn',
                    review: 'Just some test text again.'
                })
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('It should return a 404 if business have no reviews."', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/40/reviews')
                .send({
                    reviewer: 'Moritz Scorn',
                    review: 'Just some more text for testing'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Business does not exist');
                    done();
                });
        });
    });
});


// GET all reviews of a business route tests
describe('CREATE REVIEWS TESTS', () => {
    describe('When a user sends a GET request to /api/v1/businesses/:businessId/reviews', () => {
        it('It should return a 200 status', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/3/reviews')
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('It should return an object', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/4/reviews')
                .end((req, res) => {
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('Response message should equal "Found 4 reviews!"', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/1/reviews')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Found 2 reviews for this business!');
                    done();
                });
        });
        it('It should return a 404 if business does not exist or have no reviews."', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/40/reviews')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('It should return a 404 if business have no reviews."', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/40/reviews')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Business does not exist');
                    done();
                });
        });
    });
});
