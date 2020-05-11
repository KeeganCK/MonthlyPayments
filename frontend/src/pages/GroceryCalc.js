import React, { useState } from 'react';
import UserGrocery from '../Components/UserGrocery';

const GroceryCalc = props => {
	return (
		<div className="container">
		<div style={{display: "flex", flexDirection: "row"}}>
			{props.months &&
				<select
					value={props.selection}
					onChange={props.changeSelection}
					className="selectMonth"
				>
				{props.months.map((month, i) => (
					<option key={month.month + month.year} value={month.month + ' ' + month.year}>
						{month.month + ' ' + month.year}
					</option>
				))}
			</select>}
		</div>
			<div className="userLine">
				{props.month.users.map(user => (
					<UserGrocery setSomething={props.setSomething} name={user.name} id={props.month._id} grocery={user.grocery}/>
				))}
			</div>
		</div>
	)
};

export default GroceryCalc;
