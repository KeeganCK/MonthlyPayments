import React, { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import AmountsModal from './AmountsModal';
import AddModal from './AddModal';

const User = props => {

	const calcTotal = () => {
		let total = props.rent + props.internet + props.phone + props.hydro + props.grocery;
		return total;
	}

	const [showModal, setShowModal] = useState(false);
	const [showAmountsModal, setShowAmountsModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [amounts, setAmounts] = useState({
		rent: '',
		internet: '',
		phone: '',
		hydro: '',
		grocery: ''
	})

    const showPayBills = () => {
        setShowModal(true);
    }

	const showChangeAmounts = event => {
		setShowAmountsModal(true);
	}

	const showAddAmount = event => {
		setShowAddModal(true);
	}

    const onCancel = () => {
        setShowModal(false);
		setShowAmountsModal(false);
		setShowAddModal(false);
    }

	const payBills = async event => {
		try {
			const response = await fetch(`http://localhost:5000/paybills`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					rent: amounts.rent,
					internet: amounts.internet,
					phone: amounts.phone,
					hydro: amounts.hydro,
					grocery: amounts.grocery,
					id: props.id,
					name: props.name
				})
			})

			const responseData = response.json();

			if(!response.ok) {
				throw new Error(responseData.message)
			}

			onCancel();
		} catch (err) {

		}
	}

	const changeAmounts = async event => {
		try {
			const response = await fetch(`http://localhost:5000/changeamounts`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					rent: amounts.rent,
					internet: amounts.internet,
					phone: amounts.phone,
					hydro: amounts.hydro,
					grocery: amounts.grocery,
					id: props.id,
					name: props.name
				})
			})

			const responseData = response.json();

			if(!response.ok) {
				throw new Error(responseData.message)
			}

			onCancel();
		} catch (err) {

		}
	}

	const addAmount = async event => {
		try {
			const response = await fetch(`http://localhost:5000/addamounts`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					rent: amounts.rent,
					internet: amounts.internet,
					phone: amounts.phone,
					hydro: amounts.hydro,
					grocery: amounts.grocery,
					id: props.id,
					name: props.name
				})
			})

			const responseData = response.json();

			if(!response.ok) {
				throw new Error(responseData.message)
			}

			onCancel();
		} catch (err) {

		}
	}

	const changeRent = event => {
		const value = event.target.value;
		setAmounts(prevState => ({
			...prevState,
			rent: value
		}))
	}

	const changeInternet = event => {
		const value = event.target.value;
		setAmounts(prevState => ({
			...prevState,
			internet: value
		}))
	}

	const changePhone = event => {
		const value = event.target.value;
		setAmounts(prevState => ({
			...prevState,
			phone: value
		}))
	}

	const changeHydro = event => {
		const value = event.target.value;
		setAmounts(prevState => ({
			...prevState,
			hydro: value
		}))
	}

	const changeGrocery = event => {
		const value = event.target.value;
		setAmounts(prevState => ({
			...prevState,
			grocery: value
		}))
	}

	return (
		<React.Fragment>
		 <div className="user">
			<h3>{props.name}</h3>
			<h4>Amount Owed</h4>
			<p className="paraUser">Rent: ${props.rent.toFixed(2)}</p>
			<p className="paraUser">Internet: ${props.internet.toFixed(2)}</p>
			<p className="paraUser">Phone: ${props.phone.toFixed(2)}</p>
			<p className="paraUser">Hydro: ${props.hydro.toFixed(2)}</p>
			<p className="paraUser">Grocery: ${props.grocery.toFixed(2)}</p>
			<p>Total: ${calcTotal()}</p>
			<Button name="Pay Bills" onClick={showPayBills} style={{marginBottom: "0.5rem"}}/>
			<Button name="Change Amounts Owed" onClick={showChangeAmounts} style={{marginBottom: "0.5rem"}}/>
			<Button name="Add to the Amounts" onClick={showAddAmount} />

		</div>
		<Modal
			show={showModal}
			onCancel={onCancel}
			name={props.name}
			payBills={payBills}
			rent={amounts.rent}
			internet={amounts.internet}
			phone={amounts.phone}
			hydro={amounts.hydro}
			grocery={amounts.grocery}
			changeRent={changeRent}
			changeInternet={changeInternet}
			changePhone={changePhone}
			changeHydro={changeHydro}
			changeGrocery={changeGrocery}
		/>
		<AmountsModal
			show={showAmountsModal}
			onCancel={onCancel}
			name={props.name}
			changeAmounts={changeAmounts}
			rent={amounts.rent}
			internet={amounts.internet}
			phone={amounts.phone}
			hydro={amounts.hydro}
			grocery={amounts.grocery}
			changeRent={changeRent}
			changeInternet={changeInternet}
			changePhone={changePhone}
			changeHydro={changeHydro}
			changeGrocery={changeGrocery}
		/>
		<AddModal
			show={showAddModal}
			onCancel={onCancel}
			name={props.name}
			addAmounts={addAmount}
			rent={amounts.rent}
			internet={amounts.internet}
			phone={amounts.phone}
			hydro={amounts.hydro}
			grocery={amounts.grocery}
			changeRent={changeRent}
			changeInternet={changeInternet}
			changePhone={changePhone}
			changeHydro={changeHydro}
			changeGrocery={changeGrocery}
		/>
		</React.Fragment>
	);
}

export default User;
