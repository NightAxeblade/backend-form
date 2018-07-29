const expect = require('expect');
const request = require('supertest');

const {app} = require('./../../server');
const {Info} = require('./../models/info');

beforeEach((done) => {
    Info.remove({}).then(() => done());
});

describe('POST /submit', () => {
    it('should save form', (done) => {
        var firstName = 'Uddhav';

        request(app)
        .post('/submit')
        .send({firstName})
        .expect(200)
        .expect((res) => {
            expect(res.body.firstName).toBe(firstName);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Info.find().then((info) => {
                expect(info.length).toBe(1);
                expect(todos[0].firstName).toBe(firstName);
                done();
            }).catch((e) => done(e));
        });
    });
});