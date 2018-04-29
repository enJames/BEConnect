import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

// Add test businesses
describe('ADD BUSINESSES', () => {
    describe('Add test businesses"', () => {
        it('On success:: return status:201, -- just post a business', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessname: 'Jorizla Industries',
                    category: 'Food',
                    state: 'Rivers',
                    useridentifier: 1
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success:: return status:201, -- just post a business', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessname: 'Amzondia Limited',
                    category: 'Fashion',
                    state: 'Lagos',
                    useridentifier: 1
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success:: return status:201, -- just post a business', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessname: 'Selphed Limited',
                    category: 'Education',
                    state: 'Benue',
                    useridentifier: 1
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success:: return status:201, -- just post a business', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessname: 'Ajilzilla Entertainment',
                    category: 'Entertainment',
                    state: 'Abuja',
                    useridentifier: 1
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });
});

// POST Business route tests
describe('POST BUSINESSES TESTS', () => {
    describe('When a user sends a POST request to "/api/v1/businesses"', () => {
        it('if a field is not set:: return status:400, msg:Fill out all fields', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessname: 'Hamilton Berkleys',
                    category: '',
                    state: 'Kano',
                    useridentifier: 3
                })
                .end((req, res) => {
                    res.should.have.status(400);
                    assert.equal(res.body.message, 'Fill out all fields');
                    done();
                });
        });
        it('On error--unique violation:: return status:409, msg:Business name already exists', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessname: 'Selphed Limited',
                    category: 'Education',
                    state: 'Plateau',
                    useridentifier: 3
                })
                .end((req, res) => {
                    res.should.have.status(409);
                    assert.equal(res.body.message, 'Business name already exists');
                    done();
                });
        });
        it('On success:: return status:201, msg:Hamilton Berkleys has been registered successfully', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessname: 'Hamilton Berkleys',
                    category: 'Food',
                    state: 'Kano',
                    useridentifier: 3
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    assert.equal(res.body.message, 'Hamilton Berkleys has been registered successfully');
                    done();
                });
        });
        it('If POST error:: return status:500', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessname: 'Bisten Black',
                    category: 'Automobile',
                    state: 'Benue',
                    useridentifier: 'string'
                })
                .end((req, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
});

// Get a business route tests
describe('GET A BUSINESS TESTS', () => {
    describe('When a user sends a GET request to "/api/v1/businesses/:businessId"', () => {
        it('if Business not found:: return status:404, msg:Business not found', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/10')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'Business not found');
                    done();
                });
        });
        it('On success:: return status:200, msg:Business found', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/1')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'Business found');
                    done();
                });
        });
        it('On Get error--id:: return status:500', (done) => {
            chai.request(app)
                .get('/api/v1/businesses/string')
                .end((req, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
});

// Get all businesses route tests
describe('GET ALL BUSINESS TESTS', () => {
    describe('When a user sends a GET request to /api/v1/businesses', () => {
        it('On success:: return status:200, msg:Found 5 businesses', (done) => {
            chai.request(app)
                .get('/api/v1/businesses')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'Found 5 businesses');
                    done();
                });
        });
    });
});

describe('FILTER LOCATION TESTS', () => {
    describe('When a user sends a GET request to /api/v1/businesses?<location>', () => {
        it('if Business not found:: return status:404, msg:There are currently no businesses in Kafanchan', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?location=Kafanchan')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'There are currently no businesses in Kafanchan');
                    done();
                });
        });
        it('if Business not found:: return status:200, msg:Found 1 businesses in Lagos', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?location=Lagos')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'Found 1 businesses in Lagos');
                    done();
                });
        });
        it('if location query not defined:: return status:403, msg:Unknown search query', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?location=')
                .end((req, res) => {
                    res.should.have.status(403);
                    assert.equal(res.body.message, 'Unknown search query');
                    done();
                });
        });
    });
});

describe('FILTER CATEGORY TESTS', () => {
    describe('When a user sends a GET request to /api/v1/businesses?<category>', () => {
        it('if Business not found:: return status:404, msg:There are currently no businesses in Hospitality', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?category=Hospitality')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'There are currently no businesses in Hospitality');
                    done();
                });
        });
        it('if Business not found:: return status:200, msg:Found 1 businesses in Entertainment', (done) => {
            chai.request(app)
                .get('/api/v1/businesses?category=Entertainment')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'Found 1 businesses in Entertainment');
                    done();
                });
        });
    });
});

// Update business route tests
describe('PUT BUSINESSES TESTS', () => {
    describe('When a user sends a PUT request to "/api/v1/businesses/:businessId"', () => {
        it('if Business not found:: return status:404, msg:Business not found', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/10')
                .send({
                    businessname: 'Hamiltonn Berkleys',
                    category: 'Food',
                    state: 'Sokoto',
                })
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'Business not found');
                    done();
                });
        });
        it('if field(s) are not set:: return status:400, msg:Fill out all fields', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/5')
                .send({
                    businessname: 'Hamiltonn Berkleys',
                    category: '',
                    state: 'Sokoto',
                })
                .end((req, res) => {
                    res.should.have.status(400);
                    assert.equal(res.body.message, 'Fill out all fields');
                    done();
                });
        });
        it('On success: return status:200, msg:Business updated successfully', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/5')
                .send({
                    businessname: 'Hamilton Berkleys',
                    category: 'Food',
                    state: 'Sokoto',
                })
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'Business updated successfully');
                    done();
                });
        });
        it('On update error--id:: return status:500', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/string')
                .send({
                    businessname: 'Hamilton Berkleys',
                    category: 'Food',
                    state: 'Sokoto',
                })
                .end((req, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
        it('On update error--unique violation:: return status:500', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/4')
                .send({
                    businessname: 'Hamilton Berkleys',
                    category: 'Food',
                    state: 'Sokoto',
                })
                .end((req, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
});

// Delete business route tests
describe('DELETE BUSINESSES TESTS', () => {
    describe('When a user sends a DELETE request to "/api/v1/businesses/:businessId"', () => {
        it('if Business not found:: return status:404, msg:Business not found', (done) => {
            chai.request(app)
                .delete('/api/v1/businesses/10')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'Business not found');
                    done();
                });
        });
        it('On success:: return status:200, msg:Business deleted successfully', (done) => {
            chai.request(app)
                .delete('/api/v1/businesses/1')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'Business deleted successfully');
                    done();
                });
        });
        it('On delete error--id:: return status:500', (done) => {
            chai.request(app)
                .delete('/api/v1/businesses/string')
                .end((req, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
});
