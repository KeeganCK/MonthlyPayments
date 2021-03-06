const mongoose = require('mongoose');

const monthSchema = new mongoose.Schema({
	month: {type: String, trim: true, required: true},
	year: {type: Number, trim: true, required: true},
	users: {
		type: Array,
		required: true,
		default: [
			{
				name: "Keegan",
				rent: 582.67,
				internet: 30,
				phone: 43,
				carInsurance: 75,
				hydro: 10,
				grocery: 0,
				miscellaneous: 0,
				total: 582.67 + 30 + 75 + 10 + 43
			},
			{
				name: "Milena",
				rent: 582.67,
				internet: 30,
				phone: 0,
				carInsurance: 75,
				hydro: 10,
				grocery: 0,
				miscellaneous: 0,
				total: 582.67 + 30 + 75 + 10
			},
			{
				name: "Miller",
				rent: 582.67,
				internet: 30,
				phone: 0,
				carInsurance: 0,
				hydro: 10,
				grocery: 0,
				miscellaneous: 0,
				total: 582.67 + 30 + 10
			}
		]
	}
})

module.exports = mongoose.model('Month', monthSchema);
