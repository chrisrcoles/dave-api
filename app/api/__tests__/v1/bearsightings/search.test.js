
'use strict';

const supertest = require('supertest');
const server = supertest.agent('127.0.0.1:8081');
const expect = require('chai').expect;
const { BearSighting, sequelize } = require('../../../../db/models/index');

describe('Search bear sightings', function () {
	let sighting1 = {
		"bear_type": "black",
		"notes": "They were hibernating!",
		"zipcode": "10033",
		"num_bears": 5
	};
	let sighting2 = {
		"bear_type": "polar",
		"notes": "So cool! So majestic!",
		"zipcode": "56111",
		"num_bears": 8
	};
	let sighting3 = {
		"bear_type": "brown",
		"notes": "Super dangerous!",
		"zipcode": "20723",
		"num_bears": 4
	};

	this.timeout(2500);

	before(function(done) {
		BearSighting.bulkCreate([ sighting1, sighting2, sighting3 ])
			.then(()  => {
				done()
			})
	});

	it('should be return all bear sightings if no query params are included', function (done) {
		server
			.get(`/api/v1/sightings/search`)
			.expect('Content-type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(res.body.length).to.equal(3);
				expect(res.body[0].bear_type).to.equal(sighting1.bear_type);
				expect(res.body[1].bear_type).to.equal(sighting2.bear_type);
				expect(res.body[2].bear_type).to.equal(sighting3.bear_type);
				done()
			})
	});

	it('should be return all bear sightings with a matching bear type', function (done) {
		server
			.get(`/api/v1/sightings/search?bear_type=polar`)
			.expect('Content-type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(res.body.length).to.equal(1);
				expect(res.body[0].bear_type).to.equal(sighting2.bear_type);
				expect(res.body[0].notes).to.equal(sighting2.notes);
				done()
			})
	});

	it('should be return all bear sightings with a matching zipcode', function (done) {
		server
			.get(`/api/v1/sightings/search?zipcode=20723`)
			.expect('Content-type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(res.body.length).to.equal(1);
				expect(res.body[0].bear_type).to.equal(sighting3.bear_type);
				expect(res.body[0].notes).to.equal(sighting3.notes);
				done()
			})
	});

	it('should be return all bear sightings sorted by number of bears', function (done) {
		server
			.get(`/api/v1/sightings/search?sort=num_bears`)
			.expect('Content-type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(res.body.length).to.equal(3);
				expect(res.body[0].bear_type).to.equal(sighting2.bear_type);
				expect(res.body[1].bear_type).to.equal(sighting1.bear_type);
				expect(res.body[2].bear_type).to.equal(sighting3.bear_type);
				done()
			})
	});

	after(function(done) {
		BearSighting.destroy({where: {}})
			.then(() => {
				sequelize.connectionManager.close()
					.then(() => done())
			})
	});


});
