import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

// ADD test reviews
describe('ADD REVIEWS', () => {
    describe('Add test reviews"', () => {
        it('On success(1):: return status:201, -- just post a review', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/1/reviews')
                .send({
                    firstname: 'Mc Zilics',
                    lastname: 'Rodrich',
                    email: 'zilics@mansard.com',
                    company: 'Mansard Limited',
                    position: 'Marketing Manager',
                    review: 'The business is awesome!'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success(2):: return status:201, -- just post a review', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/1/reviews')
                .send({
                    firstname: 'Adimani',
                    lastname: 'Olusegun',
                    email: 'adimani@bluesky.com',
                    company: 'Blue Sky Limited',
                    position: 'Distribution Manager',
                    review: 'A customer centric business.'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success(3):: return status:201, -- just post a review', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/3/reviews')
                .send({
                    firstname: 'Adiku',
                    lastname: 'Oche',
                    email: 'AOche@makeitnow.com',
                    company: 'MakeItNow Limited',
                    position: 'Operations Director',
                    review: 'I wish I never did business with this people. Please stay away!'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success(4):: return status:201, -- just post a review', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/3/reviews')
                .send({
                    firstname: 'Zalico',
                    lastname: 'Adamu',
                    email: 'zalico@moonsure.com',
                    company: 'Moonsure Limited',
                    position: 'Marking Officer',
                    review: 'They need to learn to be open minded.'
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
        /* it('if a field is not set:: return status:400, msg:Fill out all fields', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/2/reviews')
                .send({
                    firstname: 'Casandra',
                    lastname: 'Oliver',
                    company: 'Arik Ticketing Limited',
                    position: 'Head of Operations',
                    review: 'Purposeful in the approach to business. I love them.'
                })
                .end((req, res) => {
                    res.should.have.status(400);
                    assert.equal(res.body.message, 'Fill out all fields');
                    done();
                });
        }); */
        it('On success:: return status:201, msg:Review posted', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/3/reviews')
                .send({
                    firstname: 'Casandra',
                    lastname: 'Oliver',
                    company: 'Arik Ticketing Limited',
                    position: 'Head of Operations',
                    review: 'Purposeful in the approach to business. I love them.'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    assert.equal(res.body.message, 'Review posted');
                    done();
                });
        });
        it('On error:: return status:500, msg:There was an error', (done) => {
            chai.request(app)
                .post('/api/v1/businesses/3/reviews')
                .send({
                    lastname: 'Mayor',
                    company: 'Arik Ticketing Limited',
                    position: 'Head of Operations',
                    review: 'Purposeful in the approach to business. I love them.'
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
                    firstname: 'Casandra',
                    lastname: 'Oliver',
                    company: 'Arik Ticketing Limited',
                    position: 'Head of Operations',
                    review: 'Purposeful in the approach to business. I love them.'
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
                    firstname: 'Casandra',
                    lastname: 'Oliver',
                    company: 'Arik Ticketing Limited',
                    position: 'Head of Operations',
                    review: 'Purposeful in the approach to business. I love them.'
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
                .get('/api/v1/businesses/1/reviews/1')
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
