const Month = require('../models/month');
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

	if(!months) {
		const error = new HttpError("Could not find months", 404);
		return next(error);
	}

	res.status(200).json({ months: months})
}

const addMonth = async (req, res, next) => {
	console.log("Got here, addMonths")
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

const changeAmounts = async (req, res, next) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs', 422));
	}

	const { rent, internet, phone, carInsurance, hydro, grocery, miscellaneous, id, name, total } = req.body;

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

	if(rent !== '' && rent !== undefined && rent !== null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: parseFloat(rent),
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(internet !== '' && internet !== undefined && internet !== null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: parseFloat(internet),
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(phone !== '' && phone !== undefined && phone !== null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: parseFloat(phone),
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(carInsurance !== '' && carInsurance !== undefined && carInsurance !==null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					carInsurance: parseFloat(carInsurance),
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(hydro !== '' && hydro !== undefined && hydro !==null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance,
					hydro: parseFloat(hydro),
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(grocery !== '' && grocery !== undefined && grocery !==null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro,
					grocery: parseFloat(grocery),
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(miscellaneous !== '' && miscellaneous !== undefined && miscellaneous !==null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: parseFloat(miscellaneous),
					total
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

	const { rent, internet, phone, carInsurance, hydro, grocery, miscellaneous, id, name, total } = req.body;

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

	if(rent !== '' && rent !== undefined && rent !== null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent + parseFloat(rent),
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(internet!== '' && internet !== undefined && internet !== null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet + parseFloat(internet),
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(phone !== '' && phone !== undefined && phone !== null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone + parseFloat(phone),
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(carInsurance !== '' && carInsurance !== undefined && carInsurance !==null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance + parseFloat(carInsurance),
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(hydro !== '' && hydro !== undefined && hyrdo !==null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro + parseFloat(hydro),
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous,
					total
				})
			}
		}
	}

	if(grocery !== '' && grocery !== undefined && grocery !==null) {
		if(total !== undefined && total !== null) {
			for(let i = 0; i < month.users.length; i++) {
				if(month.users[i].name === name) {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: month.users[i].internet,
						phone: month.users[i].phone,
						carInsurance: month.users[i].carInsurance,
						hydro: month.users[i].hydro,
						grocery: month.users[i].grocery + parseFloat(grocery),
						miscellaneous: month.users[i].miscellaneous,
						total
					})
				}
			}
		}
		else {
			for(let i = 0; i < month.users.length; i++) {
				if(month.users[i].name === name) {
					month.users.set(i, {
						name,
						rent: month.users[i].rent,
						internet: month.users[i].internet,
						phone: month.users[i].phone,
						carInsurance: month.users[i].carInsurance,
						hydro: month.users[i].hydro,
						grocery: month.users[i].grocery + parseFloat(grocery),
						miscellaneous: month.users[i].miscellaneous,
						total: month.users[i].total + parseFloat(grocery)
					})
				}
			}
		}

	}

	if(miscellaneous !== '' && miscellaneous !== undefined && miscellaneous !==null) {
		for(let i = 0; i < month.users.length; i++) {
			if(month.users[i].name === name) {
				month.users.set(i, {
					name,
					rent: month.users[i].rent,
					internet: month.users[i].internet,
					phone: month.users[i].phone,
					carInsurance: month.users[i].carInsurance,
					hydro: month.users[i].hydro,
					grocery: month.users[i].grocery,
					miscellaneous: month.users[i].miscellaneous + parseFloat(miscellaneous),
					total
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
exports.changeAmounts = changeAmounts;
exports.addAmounts = addAmounts;
