import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

describe('POST BUSINESSES TESTS', () => {
    describe('When a user sends a POST request to "/businesses"', () => {
        it('It should return a 201 status', (done) => {
            chai.request(app)
                .post('/businesses')
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
                .post('/businesses')
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
                .post('/businesses')
                .send({
                    businessName: 'Hamilton Berkleys',
                    category: 'Food',
                    state: 'Kano'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Registration successful!', 'compare');
                    done();
                });
        });
        it('It should return a 400 if a field is not set."', (done) => {
            chai.request(app)
                .post('/businesses')
                .send({
                    businessName: 'Hamisc Berkleys',
                    category: '',
                    state: 'Sokoto'
                })
                .end((req, res) => {
                    assert.equal(res.body.message, 'Fill out all fields', 'compare');
                    done();
                });
        });
    });
});
