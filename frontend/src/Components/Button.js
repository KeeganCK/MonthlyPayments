import React from 'react';

const Button = props => {
	return <div>
			<button className={`btn ${props.class}`} onClick={props.onClick} style={props.style}>{props.name}</button>
		</div>
}

export default Button;
