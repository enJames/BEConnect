import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

// POST Business route tests
describe('CREATE REVIEWS TESTS', () => {
    describe('When a user sends a POST request to /api/v1/businesses/:businessId/reviews', () => {
        it('It should return a 201 status', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/1/reviews')
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
                .post('/api/v1/businesses/1/reviews')
                .send({
                    reviewer: 'Jazril spaniard',
                    review: 'This is just yet, another post review test'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Review posted!');
                    done();
                });
        });
        it('It should return a 400 if a field is not set.', (done) => {
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
    describe('When a user sends a GET request to /api/v1/businesses/:businessId/reviews:', () => {
        it('It should return all reviews for the business.', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/1/reviews')
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('It should return a 404 status if there are no reviews for the business.', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/5/reviews')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('It should return the message "No review for this business yet".', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/5/reviews')
                .end((req, res) => {
                    assert.equal(res.body.message, 'No review for this business yet');
                    done();
                });
        });
        it('It should return a 404 status if the reviewed business does not exist.', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/40/reviews')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    describe('When a user sends a GET request to /api/v1/businesses/:businessId/reviews/:reviewId', () => {
        it('It should return a particular review for the business.', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/1/reviews/10')
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('It should return 404 status if the reviewed business no longer exists.', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/40/reviews/40')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('It should return 404 status if the particular review does not exist but the business does.', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/1/reviews/40')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});
