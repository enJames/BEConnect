import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

describe('ADD REVIEWS', () => {
    describe('Add test reviews"', () => {
        it('On success:: return status:201, -- just post a review', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/4/reviews')
                .send({
                    reveiwer: 'Spindus Inclick',
                    review: 'This is a post review test'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success:: return status:201, -- just post a review', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/4/reviews')
                .send({
                    reveiwer: 'Josh Paranda',
                    review: 'Something underneath'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success:: return status:201, -- just post a review', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/4/reviews')
                .send({
                    reveiwer: 'Andrew lever',
                    review: 'Something in here again'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success:: return status:201, -- just post a review', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/4/reviews')
                .send({
                    reveiwer: 'Azilics Brosimos',
                    review: 'Something Something Something Something'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });
});

// POST Reviews route tests
describe('POST REVIEWS TESTS', () => {
    describe('When a user sends a POST request to /api/v1/businesses/:businessId/reviews', () => {
        it('if a field is not set:: return status:400, msg:Fill out all fields', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/4/reviews')
                .send({
                    reveiwer: '',
                    review: 'This is a post review test'
                })
                .end((req, res) => {
                    res.should.have.status(400);
                    assert.equal(res.body.message, 'Fill out all fields');
                    done();
                });
        });
        it('On success:: return status:201, msg:Review posted', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/3/reviews')
                .send({
                    reveiwer: 'Jossy Hamiltus',
                    review: 'Adding some more test text'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    assert.equal(res.body.message, 'Review posted');
                    done();
                });
        });
        it('On error:: return status:500, msg:There was an error', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/4/reviews')
                .send({
                    reveiwer: 'Prosis Mayor',
                    review: 'Adding some more test text'
                })
                .end((req, res) => {
                    res.should.have.status(500);
                    assert.equal(res.body.message, 'There was an error');
                    done();
                });
        });
        it('If business not found:: return status:404, msg:Business not found', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/10/reviews')
                .send({
                    reveiwer: 'Jossy Hamiltus',
                    review: 'This is a post on business 10'
                })
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'Business not found');
                    done();
                });
        });
        it('If business not found:: return status:500, msg:There was an error', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/string/reviews')
                .send({
                    reveiwer: 'Potiskum Mail',
                    review: 'Shukuras tasilinga'
                })
                .end((req, res) => {
                    res.should.have.status(500);
                    assert.equal(res.body.message, 'There was an error');
                    done();
                });
        });
    });
});

// Get a review route tests
describe('GET A REVIEW TESTS', () => {
    describe('When a user sends a GET request to "/api/v1/businesses/businessId/reviews/:reviewId"', () => {
        it('if Business not found:: return status:404, msg:Business not found', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/10/reviews/1')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'Business not found');
                    done();
                });
        });
        it('if Review not found:: return status:404, msg:Review not found', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/3/reviews/10')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'Review not found');
                    done();
                });
        });
        it('On success:: return status:200, msg:Review found', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/4/reviews/1')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'Review');
                    done();
                });
        });
    });
});

// Get all reviews route tests
describe('GET ALL REVIEWS TESTS', () => {
    describe('When a user sends a GET request to /api/v1/businesses/:businessId/reviews', () => {
        it('On success:: return status:200, msg:All Reviews', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/3/reviews')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'All reviews');
                    done();
                });
        });
    });
});
