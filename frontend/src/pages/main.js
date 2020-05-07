import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import UserLine from '../Components/UserLine';

const Main = props => {
	return (
		<div className="container">
			<div style={{display: "flex", flexDirection: "row"}}>
				<select className="selectMonth">
					<option className="option" value="May 2020">May 2020</option>
					<option className="option" value="May 2020">May 2020</option>
				</select>
				<Button name="Add Month" style={{marginLeft: "1rem"}}/>
			</div>
            <UserLine />
        </div>
	);
}

export default Main;
