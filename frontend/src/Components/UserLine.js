import React from 'react';
import User from './User';

const UserLine = props => {
	return(
		<div className="userLine">
			{props.users.users.map(user => (
				<User
					id={props.users._id}
					key={user.id}
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
