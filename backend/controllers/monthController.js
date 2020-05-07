const Month = require('../models/Month');
const HttpError = require('../models/http-error');

const { validationResult } = require('express-validator');

const getMonths = async (req, res, next) => {
	let months;
	try {
		months = await Month.find();
	} catch (err) {
		const error = new HttpError("something went wrong retrieving the Months list", 500);
		return next(error);
	}

	if(!users) {
		const error = new HttpError("Could not find months", 404);
		return next(error);
	}

	res.status(200).json({ months: months.toObject({getters: true}) })
}

const createMonth = async (req, res, next) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs', 422));
	}

	const {month, year} = req.body;
}

exports.getMonths = getMonths;
