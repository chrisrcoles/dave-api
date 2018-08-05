'use strict';

const supertest = require('supertest');
const server = supertest.agent('127.0.0.1:8081');
const expect = require('chai').expect;
const { BearSighting } = require('../../../../db/models/index');

describe('Get bear sighting by ID', function () {

	this.timeout(2500);

	it('should get a bear sightings record by ID', function (done) {
		const payload = {
			"bear_type": "black",
			"notes": "They were hibernating!",
			"zipcode": "10033",
			"num_bears": 5
		};

		BearSighting.create(payload)
			.then(data => {

				const id = data.dataValues.id;

				server
					.get(`/api/v1/sightings/${id}`)
					.expect('Content-type', /json/)
					.expect(200)
					.end((err, res) => {
						expect(res.body.bear_type).to.equal(payload.bear_type)
						expect(res.body.notes).to.equal(payload.notes)
						expect(res.body.zipcode).to.equal(payload.zipcode)
						expect(res.body.num_bears).to.equal(payload.num_bears)
						done()
					})
			})



	});

	after(function(done) {
		BearSighting.destroy({where: {}})
			.then(() => done())
	});


});
