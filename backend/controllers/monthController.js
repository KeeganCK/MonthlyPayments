const Month = require('../Models/Month');
const HttpError = require('../Models/http-error');

const { validationResult } = require('express-validator');

const getMonths = async (req, res, next) => {
	let months;
	try {
		months = await Month.find();
	} catch (err) {
		const error = new HttpError("something went wrong retrieving the Months list", 500);
		return next(error);
	}

	if(!months) {
		const error = new HttpError("Could not find months", 404);
		return next(error);
	}

	res.status(200).json({ months: months})
}

const addMonth = async (req, res, next) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs', 422));
	}

	const {month, year} = req.body;

	let createdMonth = new Month({
		month,
		year
	})

	try {
		await createdMonth.save();
	} catch (err) {
		const error = new HttpError('Creating a Month failed, please try again', 500);
		return next(error);
	}

	res.status(201).json({month: createdMonth})

}

const payBills = async (req, res, next) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs', 422));
	}

	const { rent, internet, phone, hydro, grocery, id, name } = req.body;

	let month;
	try {
		month = await Month.findById(id);
	} catch (err) {
		const error = new HttpError("Could not payBills, something went wrong", 500);
		return next(error);
	}

	if(!month) {
		const error = new HttpError("Could not find month specified for this bill payment", 404);
		return next(error);
	}

	if(rent !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				if(month.users[i].rent - rent <= 0) {
					month.users.set(i, {
						name,
						rent: 0,
						internet: month.users[i].internet,
						phone: month.users[i].phone,
						hydro: month.users[i].hydro,
						grocery: month.users[i].grocery
					})
				}
				else {
					month.users.set(i, {
						name,
						rent: month.users[i].rent - rent,
						internet: month.users[i].internet,
						phone: month.users[i].phone,
						hydro: month.users[i].hydro,
						grocery: month.users[i].grocery
					})
				}
			}
		}
	}

	if(internet !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				if(month.users[i].internet - internet <= 0) {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: 0,
						phone: month.users[i].phone,
						hydro: month.users[i].hydro,
						grocery: month.users[i].grocery
					})
				}
				else {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: month.users[i].internet - internet,
						phone: month.users[i].phone,
						hydro: month.users[i].hydro,
						grocery: month.users[i].grocery
					})
				}
			}
		}
	}

	if(phone !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				if(month.users[i].phone - phone <= 0) {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: month.users[i].internet,
						phone: 0,
						hydro: month.users[i].hydro,
						grocery: month.users[i].grocery
					})
				}
				else {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: month.users[i].internet,
						phone: month.users[i].phone - phone,
						hydro: month.users[i].hydro,
						grocery: month.users[i].grocery
					})
				}
			}
		}
	}

	if(hydro !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				if(month.users[i].hydro - hydro <= 0) {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: month.users[i].internet,
						phone: month.users[i].phone,
						hydro: 0,
						grocery: month.users[i].grocery
					})
				}
				else {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: month.users[i].internet,
						phone: month.users[i].phone,
						hydro: month.users[i].hydro - hydro,
						grocery: month.users[i].grocery
					})
				}
			}
		}
	}

	if(grocery !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				if(month.users[i].grocery -grocery <= 0) {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: month.users[i].internet,
						phone: month.users[i].phone,
						hydro: month.users[i].hydro,
						grocery: 0
					})
				}
				else {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: month.users[i].internet,
						phone: month.users[i].phone,
						hydro: month.users[i].hydro,
						grocery: month.users[i].grocery - grocery
					})
				}
			}
		}
	}

	try {
		await month.save()
	} catch (err) {
		const error = new HttpError("Could not save new month data, please try again", 500);
		return next(error);
	}

	res.status(200).json({message: "All Done!"})
}

const changeAmounts = async (req, res, next) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs', 422));
	}

	const { rent, internet, phone, hydro, grocery, id, name } = req.body;

	let month;
	try {
		month = await Month.findById(id);
	} catch (err) {
		const error = new HttpError("Could not payBills, something went wrong", 500);
		return next(error);
	}

	if(!month) {
		const error = new HttpError("Could not find month specified for this bill payment", 404);
		return next(error);
	}

	if(rent !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: parseFloat(rent),
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery
				})
			}
		}
	}

	if(internet !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: parseFloat(internet),
					phone: month.users[i].phone,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery
				})
			}
		}
	}

	if(phone !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: parseFloat(phone),
					hydro: month.users[i].hydro,
					grocery: month.users.grocery
				})
			}
		}
	}

	if(hydro !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					hydro: parseFloat(hydro),
					grocery: month.users[i].grocery
				})
			}
		}
	}

	if(grocery !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					hydro: month.users[i].hydro,
					grocery: parseFloat(grocery)
				})
			}
		}
	}

	try {
		await month.save()
	} catch (err) {
		const error = new HttpError("Could not save new month data, please try again", 500);
		return next(error);
	}

	res.status(200).json({message: "All Done!"})
}

const addAmounts = async (req, res, next) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs', 422));
	}

	const { rent, internet, phone, hydro, grocery, id, name } = req.body;

	let month;
	try {
		month = await Month.findById(id);
	} catch (err) {
		const error = new HttpError("Could not payBills, something went wrong", 500);
		return next(error);
	}

	if(!month) {
		const error = new HttpError("Could not find month specified for this bill payment", 404);
		return next(error);
	}

	if(rent !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent + parseFloat(rent),
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery
				})
			}
		}
	}

	if(internet !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet + parseFloat(internet),
					phone: month.users[i].phone,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery
				})
			}
		}
	}

	if(phone !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone + parseFloat(phone),
					hydro: month.users[i].hydro,
					grocery: month.users.grocery
				})
			}
		}
	}

	if(hydro !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					hydro: month.users[i].hydro + parseFloat(hydro),
					grocery: month.users[i].grocery
				})
			}
		}
	}

	if(grocery !== '') {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery + parseFloat(grocery)
				})
			}
		}
	}

	try {
		await month.save()
	} catch (err) {
		const error = new HttpError("Could not save new month data, please try again", 500);
		return next(error);
	}

	res.status(200).json({message: "All Done!"})
}

exports.getMonths = getMonths;
exports.addMonth = addMonth;
exports.payBills = payBills;
exports.changeAmounts = changeAmounts;
exports.addAmounts = addAmounts;
