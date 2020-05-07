import React, { useState } from 'react';
import Button from './Button';
import Modal from './Modal';

const User = props => {

	const calcTotal = () => {
		let total = props.rent + props.internet + props.phone + props.hydro;
		return total;
	}

	const [showModal, setShowModal] = useState(false);

    const showPayBills = () => {
        setShowModal(true);
    }

    const onCancel = () => {
        setShowModal(false);
    }

	return (
		<React.Fragment>
		 <div className="user">
			<h3>{props.name}</h3>
			<h4>Amount Owed</h4>
			<p className="paraUser">Rent: ${props.rent}</p>
			<p className="paraUser">Internet: ${props.internet}</p>
			<p className="paraUser">Phone: ${props.phone}</p>
			<p className="paraUser">Hydro: ${props.hydro}</p>
			<p className="paraUser">Grocery: ${props.grocery}</p>
			<p>Total: ${calcTotal()}</p>
			<Button name="Pay Bills" onClick={showPayBills}/>
		</div>
		<Modal show={showModal} onCancel={onCancel} name={props.name}/>
		</React.Fragment>
	);
}

export default User;
