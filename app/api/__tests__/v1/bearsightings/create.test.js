'use strict';

const supertest = require('supertest');
const server = supertest.agent('127.0.0.1:8081');
const expect = require('chai').expect;
const { BearSighting } = require('../../../../db/models/index');

describe('Create a bear sighting', function () {

  this.timeout(2500);

  it('should create a new bear sightings record', function (done) {
    const payload = {
      "bear_type": "polar",
      "notes": "So cool! So majestic!",
      "zipcode": "56111",
      "num_bears": 8
    };

    server
      .post('/api/v1/sightings')
      .send(payload)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body.bear_type).to.equal(payload.bear_type);
        expect(res.body.notes).to.equal(payload.notes);
        expect(res.body.zipcode).to.equal(payload.zipcode);
        expect(res.body.num_bears).to.equal(payload.num_bears);
        done()
      })

  });

  after(function(done) {
    BearSighting.destroy({where: {}})
      .then(() => {
        done()
      })
  });


});
