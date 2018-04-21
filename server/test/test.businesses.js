import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

// POST Business route tests
describe('POST BUSINESSES TESTS', () => {
    describe('When a user sends a POST request to "/api/v1/businesses"', () => {
        it('It should return a 201 status', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Hamilton Berkleys',
                    category: 'Food',
                    state: 'Kano'
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('It should return an object', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Hamilton Berkleys',
                    category: 'Food',
                    state: 'Kano'
                })
                .end((req, res) => {
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('Response message should equal "Registration successful!"', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Hamilton Berkleys',
                    category: 'Food',
                    state: 'Kano'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Registration successful!');
                    done();
                });
        });
        it('It should return a 400 if a field is not set."', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Hamisc Berkleys',
                    category: '',
                    state: 'Sokoto'
                })
                .end((req, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('It should return a message "Fill out all fields" if a field (or more) is/are not set', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Hamisc Berkleys',
                    category: '',
                    state: 'Sokoto'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Fill out all fields');
                    done();
                });
        });
    });
});

// Update business route tests
describe('PUT BUSINESSES TESTS', () => {
    describe('When a user sends a PUT request to "/api/v1/businesses/:businessId"', () => {
        it('It should return a 200 status', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/4')
                .send({
                    state: 'Oyo'
                })
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('It should return an object', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/3')
                .send({
                    category: 'Mining'
                })
                .end((req, res) => {
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('Response message should equal "Business updated!"', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/4')
                .send({
                    state: 'Lagos'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Business updated!');
                    done();
                });
        });
        it('It should return a 404 status if business is not found."', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/10')
                .send({
                    businessName: 'Hamisc Berkleys Limited'
                })
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('It should return a message "Business not found." if business does not exist', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/10')
                .send({
                    businessName: 'Hamisc Berkleys Limited'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Business not found!');
                    done();
                });
        });
    });
});

// Delete business route tests
describe('DELETE BUSINESSES TESTS', () => {
    describe('When a user sends a DELETE request to "/api/v1/businesses/:businessId"', () => {
        it('It should return a 202 status', (done) => {
            chai.request(app)
                .delete('/api/v1/businesses/4')
                .end((req, res) => {
                    res.should.have.status(202);
                    done();
                });
        });
        it('It should return an object', (done) => {
            chai.request(app)
                .delete('/api/v1/businesses/3')
                .end((req, res) => {
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('Response message should equal "Business deleted!"', (done) => {
            chai.request(app)
                .delete('/api/v1/businesses/2')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Business deleted!');
                    done();
                });
        });
        it('It should return a 404 status if business is not found."', (done) => {
            chai.request(app)
                .delete('/api/v1/businesses/10')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('It should return a message "Business not found!" if business does not exist', (done) => {
            chai.request(app)
                .delete('/api/v1/businesses/10')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Business not found!');
                    done();
                });
        });
    });
});

// Get a business route tests
describe('GET A BUSINESS TESTS', () => {
    describe('When a user sends a GET request to "/api/v1/businesses/:businessId"', () => {
        it('It should return a 200 status', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/1')
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('It should return an object', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/1')
                .end((req, res) => {
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('Response message should equal "Business found!"', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/1')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Business found!');
                    done();
                });
        });
        it('It should return a 404 status if business is not found."', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/10')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('It should return a message "Business not found!" if business does not exist', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/10')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Business not found!');
                    done();
                });
        });
    });
});

// Get all businesses route tests
describe('GET ALL BUSINESS TESTS', () => {
    describe('When a user sends a GET request to /api/v1/businesses', () => {
        it('It should return a 200 status', (done) => {
            chai.request(app)
                .get('/api/v1/businesses')
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('Response message should equal "Found 5 businesses"', (done) => {
            chai.request(app)
                .get('/api/v1/businesses')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Found 5 businesses');
                    done();
                });
        });
        it('It should return 5 businesses', (done) => {
            chai.request(app)
                .get('/api/v1/businesses')
                .end((req, res) => {
                    res.body.responseObject.length.should.equal(5);
                    done();
                });
        });
    });
});

describe('FILTER LOCATION TESTS', () => {
    describe('When a user sends a GET request to /api/v1/businesses?<location>', () => {
        it('Response message should equal "Found 1 businesses"', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?location=Lagos')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Found 1 businesses');
                    done();
                });
        });
        it('It should return 1 business', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?location=Lagos')
                .end((req, res) => {
                    res.body.responseObject.length.should.equal(1);
                    done();
                });
        });
        it('It should return a 404 status if there is no business with the search location', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?location=Enugu')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('It should return a 404 status if the search parameter for location is not defined', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?location=')
                .end((req, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});

describe('FILTER CATEGORY TESTS', () => {
    describe('When a user sends a GET request to /api/v1/businesses?<category>', () => {
        it('Response message should equal "Found 1 businesses"', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?category=Entertainment')
                .end((req, res) => {
                    assert.equal(res.body.message, 'Found 1 businesses');
                    done();
                });
        });
        it('It should return 1 business', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?category=Entertainment')
                .end((req, res) => {
                    res.body.responseObject.length.should.equal(1);
                    done();
                });
        });
    });
});
