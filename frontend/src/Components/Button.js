import React from 'react';

const Button = props => {
	return <div>
			<button className={`${props.className} btn`} onClick={props.onClick} style={props.style} value={props.value}>{props.name}</button>
		</div>
}

export default Button;
