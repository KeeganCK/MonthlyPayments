import React from 'react';
import User from './User';

const UserLine = props => {

	const users = [
		{
			name: "Keegan",
			rent: 700,
			internet: 45,
			phone: 43,
			carInsurance: 75,
			hydro: 15,
			grocery: 0,
		},
		{
			name: "Milena",
			rent: 700,
			internet: 45,
			phone: 0,
			carInsurance: 75,
			hydro: 15,
			grocery: 0
		},
		{
			name: "Miller",
			rent: 350,
			internet: 0,
			phone: 0,
			carInsurance: 0,
			hydro: 0,
			grocery: 0
		}
	]

	return(
		<div className="userLine">
			{users.map(user => (
				<User
					name={user.name}
					rent={user.rent}
					internet={user.internet}
					phone={user.phone}
					carInsurance={user.carInsurance}
					hydro={user.hydro}
					grocery={user.grocery}
				/>
			))}
		</div>
	);
}

export default UserLine;
