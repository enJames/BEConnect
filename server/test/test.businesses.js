import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

// Add test businesses
describe('ADD BUSINESSES', () => {
    describe('Add test businesses"', () => {
        it('On success(1):: return status:201, -- just post a business', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Franchizy',
                    category: 'Hospitality',
                    mantra: 'Good is good',
                    email: 'info@franchizy.com',
                    website: 'www.franchizy.com',
                    phone: '01-4612879',
                    addressOne: '16, lane street',
                    addressTwo: 'Opposite church Road',
                    city: 'Ilasamaja',
                    state: 'Ondo',
                    country: 'Nigeria',
                    userIdentifier: 1
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success(2):: return status:201, -- just post a business', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Mosili',
                    category: 'Technology',
                    mantra: 'The future is here',
                    email: 'info@mosili.com',
                    website: 'www.mosili.com',
                    phone: '01-46175679',
                    addressOne: '25, Arico street',
                    addressTwo: 'Beside Remisine building',
                    city: 'Arepo',
                    state: 'Lagos',
                    country: 'Nigeria',
                    userIdentifier: 1
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success(3):: return status:201, -- just post a business', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Selphed Limited',
                    category: 'Education',
                    mantra: 'Grow is inevitable',
                    email: 'info@selphed.com',
                    website: 'www.selphed.com',
                    phone: '01-6627279',
                    addressOne: 'Plot 16, Visciris close',
                    addressTwo: 'Rustill Avenue',
                    city: 'Adricity',
                    state: 'Fortil',
                    country: 'Amianich',
                    userIdentifier: 2
                })
                .end((req, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('On success(4):: return status:201, -- just post a business', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Zintilia Records',
                    category: 'Entertainment',
                    mantra: 'We live it',
                    email: 'info@zintilia.com',
                    website: 'www.zintilia.com',
                    phone: '01-7614879',
                    addressOne: 'Plot 2A, Nostril street',
                    addressTwo: 'Forte mont crescent',
                    city: 'Dealbore',
                    state: 'Onstalli',
                    country: 'Cambriana',
                    userIdentifier: 2
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
        /* it('if a field is not set:: return status:400, msg:Fill out all fields', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Hamilton Berkleys',
                    category: 'Hospitality',
                    mantra: 'Good is good',
                    email: 'info@franchizy.com',
                    website: 'www.franchizy.com',
                    phone: '01-4612879',
                    addressOne: '16, lane street',
                    addressTwo: 'Opposite church Road',
                    city: 'Ilasamaja',
                    state: 'Ondo',
                    country: 'Nigeria',
                    userIdentifier: 1
                })
                .end((req, res) => {
                    res.should.have.status(400);
                    assert.equal(res.body.message, 'Fill out all fields');
                    done();
                });
        }); */
        it('On error--unique violation:: return status:409, msg:Business name already exists', (done) => {
            chai.request(app)
                .post('/api/v1/businesses')
                .send({
                    businessName: 'Selphed Limited',
                    category: 'Hospitality',
                    mantra: 'Learn learn',
                    email: 'info@selphedltd.com',
                    website: 'www.selphedltd.com',
                    phone: '01-8452879',
                    addressOne: 'Maina close',
                    addressTwo: 'Trans Amadi',
                    city: 'Port Harcourt',
                    state: 'Rivers',
                    country: 'Nigeria',
                    userIdentifier: 1
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
                    businessName: 'Hamilton Berkleys',
                    category: 'Hospitality',
                    mantra: 'Good is good',
                    email: 'info@hamiltonberkleys.com',
                    website: 'www.hamiltonberkleys.com',
                    phone: '01-5712800',
                    addressOne: '875, Alanin street',
                    addressTwo: 'Alshazara Centre',
                    city: 'Estinno',
                    state: 'Installia',
                    country: 'Abrevia',
                    userIdentifier: 2
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
                    businessName: 'Boston Limited',
                    category: 'Agriculture',
                    mantra: 'Eat to hell',
                    email: 'info@boston.com',
                    website: 'www.boston.com',
                    phone: '01-4856479',
                    addressOne: 'Ill blink close',
                    addressTwo: 'Opposite Roso farms',
                    city: 'Apa',
                    state: 'Benue',
                    country: 'Nigeria',
                    userIdentifier: 'string'
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
                .get('/api/v1/businesses?category=Fashion')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'There are currently no businesses in Fashion');
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
                    businessName: 'Hamilton Berkleys',
                    category: 'Hospitality',
                    mantra: 'Home away from home',
                    email: 'info@hamiltonberkleys.com',
                    website: 'www.hamiltonberkleys.com',
                    phone: '01-5712800',
                    addressOne: '875, Alanin street',
                    addressTwo: 'Alshazara Centre',
                    city: 'Estinno',
                    state: 'Installia',
                    country: 'Abrevia'
                })
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.message, 'Business not found');
                    done();
                });
        });
        /* it('if field(s) are not set:: return status:400, msg:Fill out all fields', (done) => {
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
        }); */
        it('On success: return status:200, msg:Business updated successfully', (done) => {
            chai.request(app)
                .put('/api/v1/businesses/5')
                .send({
                    businessName: 'Hamilton Berkleys',
                    category: 'Hospitality',
                    mantra: 'Good is good',
                    email: 'info@hamiltonberkleys.com',
                    website: 'www.hamiltonberkleys.com',
                    phone: '01-5712800',
                    addressOne: '875, Alanin street',
                    addressTwo: 'Alshazara Centre',
                    city: 'Estinno',
                    state: 'Installia',
                    country: 'Abrevia'
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
                    businessName: 'Hamilton Berkleys',
                    category: 'Hospitality',
                    mantra: 'Good is good',
                    email: 'info@hamiltonberkleys.com',
                    website: 'www.hamiltonberkleys.com',
                    phone: '01-5712800',
                    addressOne: '875, Alanin street',
                    addressTwo: 'Alshazara Centre',
                    city: 'Estinno',
                    state: 'Installia',
                    country: 'Abrevia'
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
                    businessName: 'Hamilton Berkleys',
                    category: 'Hospitality',
                    mantra: 'Good is good',
                    email: 'info@hamiltonberkleys.com',
                    website: 'www.hamiltonberkleys.com',
                    phone: '01-5712800',
                    addressOne: '875, Alanin street',
                    addressTwo: 'Alshazara Centre',
                    city: 'Estinno',
                    state: 'Installia',
                    country: 'Abrevia'
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
                .delete('/api/v1/businesses/4')
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
