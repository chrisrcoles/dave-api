'use strict';

const {
  Sequelize,
  BearSighting
} = require('../../../../db/models/index');

const Op = Sequelize.Op;

module.exports = (req, res) => {
  let query = {};
  query.where = {};

  const bear_type = req.swagger.params.bear_type.value;
  const start_date = req.swagger.params.start_date.value;
  const end_date = req.swagger.params.end_date.value;
  const sort = req.swagger.params.sort.value;
  const zipcode = req.swagger.params.zipcode.value;

  if (start_date) query.where['start_date'] = { [Op.gte]: new Date(start_date) };
  if (end_date) query.where['end_date'] = { [Op.lte]: new Date(end_date) };

  if (bear_type) query.where['bear_type'] = bear_type;
  if (zipcode) query.where['zipcode'] = zipcode;

  if (sort) {
    if (sort === 'num_bears') {
      query.order = [['num_bears', 'DESC']];
    }
  }

  BearSighting.findAll(query)
    .then(bearSighting => {
      return res.status(200).send(bearSighting)
    })
    .catch(err => {
      let errors = [];
      errors.push({err: err.message, message: `Error getting bear sightings.`});

      return res.status(404).send({errors});
    })
};
