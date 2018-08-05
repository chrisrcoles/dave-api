'use strict';

const { MODELS } = require('../../lib/constants/index');

module.exports = (sequelize, DataTypes) => {
	const BearSighting = sequelize.define(MODELS.BEARSIGHTING.MODEL, {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		bear_type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		zipcode: {
			type: DataTypes.STRING,
			allowNull: false
		},
		num_bears: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		start_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		end_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		}
	}, {
		tableName: MODELS.BEARSIGHTING.TABLE,
		timestamps: true
	});

	BearSighting.associate = (models) => {};
	return BearSighting;
};
