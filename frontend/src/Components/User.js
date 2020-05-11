import React, { useState, useEffect } from 'react';
import Button from './Button';
import Modal from './Modal';
import AmountsModal from './AmountsModal';
import AddModal from './AddModal';

const User = props => {

	const [total, setTotal] = useState(0);

	const [showModal, setShowModal] = useState(false);
	const [showAmountsModal, setShowAmountsModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [amounts, setAmounts] = useState({
		rent: '',
		internet: '',
		phone: '',
		carInsurance: '',
		hydro: '',
		grocery: '',
		miscellaneous: ''
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

	useEffect(() => {
		let newTotal = total;
		newTotal = props.rent + props.internet + props.phone + props.hydro + props.grocery + props.carInsurance + props.miscellaneous;
		setTotal(newTotal);
	}, [props.rent, props.internet, props.phone, props.hydro, props.grocery, props.carInsurance, props.miscellaneous])

	const changeAmounts = async event => {
		event.preventDefault();
		try {
			// const response = await fetch(`http://localhost:5000/changeamounts`, {
			const response = await fetch(`https://mainexpenses.herokuapp.com/changeamounts`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					rent: amounts.rent,
					internet: amounts.internet,
					phone: amounts.phone,
					carInsurance: amounts.carInsurance,
					hydro: amounts.hydro,
					grocery: amounts.grocery,
					miscellaneous: amounts.miscellaneous,
					id: props.id,
					name: props.name,
					total: total
				})
			})

			const responseData = response.json();

			if(!response.ok) {
				throw new Error(responseData.message)
			}
			onCancel();
			setAmounts({
				rent: '',
				internet: '',
				phone: '',
				carInsurance: '',
				hydro: '',
				grocery: '',
				miscellaneous: ''
			})
			props.setSomething(Math.floor(Math.random() *Math.floor(100)));
		} catch (err) {

		}
	}

	const addAmount = async event => {
		event.preventDefault();
		try {
			// const response = await fetch(`http://localhost:5000/addamounts`, {
			const response = await fetch(`https://mainexpenses.herokuapp.com/addamounts`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					rent: amounts.rent,
					internet: amounts.internet,
					phone: amounts.phone,
					carInsurance: amounts.carInsurance,
					hydro: amounts.hydro,
					grocery: amounts.grocery,
					miscellaneous: amounts.miscellaneous,
					id: props.id,
					name: props.name,
					total: total
				})
			})

			const responseData = response.json();

			if(!response.ok) {
				throw new Error(responseData.message)
			}

			onCancel();
			setAmounts({
				rent: '',
				internet: '',
				phone: '',
				carInsurance: '',
				hydro: '',
				grocery: '',
				miscellaneous: ''
			})
			props.setSomething(Math.floor(Math.random() *Math.floor(100)));
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

	const changeCarInsurance = event => {
		const value = event.target.value;
		setAmounts(prevState => ({
			...prevState,
			carInsurance: value
		}))
	}

	const changeMiscellaneous = event => {
		const value = event.target.value;
		setAmounts(prevState => ({
			...prevState,
			miscellaneous: value
		}))
	}

	return (
		<React.Fragment>
		 <div className="user">
			<h3>{props.name}</h3>
			<h4>Month Expenses</h4>
			<p className="paraUser">Rent: ${props.rent.toFixed(2)}</p>
			<p className="paraUser">Internet: ${props.internet.toFixed(2)}</p>
			<p className="paraUser">Phone: ${props.phone.toFixed(2)}</p>
			<p className="paraUser">Car Insurance: ${props.carInsurance.toFixed(2)}</p>
			<p className="paraUser">Hydro: ${props.hydro.toFixed(2)}</p>
			<p className="paraUser">Grocery: ${props.grocery.toFixed(2)}</p>
			<p className="paraUser">Miscellaneous: ${props.miscellaneous.toFixed(2)}</p>

			<p>Total: ${total.toFixed(2)}</p>
			<Button name="Change Amounts Owed" onClick={showChangeAmounts} style={{marginBottom: "0.5rem"}}/>
			<Button name="Add to the Amounts" onClick={showAddAmount} />

		</div>
		<AmountsModal
			show={showAmountsModal}
			onCancel={onCancel}
			name={props.name}
			changeAmounts={changeAmounts}
			rent={amounts.rent}
			internet={amounts.internet}
			phone={amounts.phone}
			carInsurance={amounts.carInsurance}
			hydro={amounts.hydro}
			grocery={amounts.grocery}
			miscellaneous={amounts.miscellaneous}
			changeRent={changeRent}
			changeInternet={changeInternet}
			changePhone={changePhone}
			changeHydro={changeHydro}
			changeGrocery={changeGrocery}
			changeCarInsurance={changeCarInsurance}
			changeMiscellaneous={changeMiscellaneous}
		/>
		<AddModal
			show={showAddModal}
			onCancel={onCancel}
			name={props.name}
			addAmounts={addAmount}
			rent={amounts.rent}
			internet={amounts.internet}
			phone={amounts.phone}
			carInsurance={amounts.carInsurance}
			hydro={amounts.hydro}
			grocery={amounts.grocery}
			miscellaneous={amounts.miscellaneous}
			changeRent={changeRent}
			changeInternet={changeInternet}
			changePhone={changePhone}
			changeHydro={changeHydro}
			changeGrocery={changeGrocery}
			changeCarInsurance={changeCarInsurance}
			changeMiscellaneous={changeMiscellaneous}
		/>
		</React.Fragment>
	);
}

export default User;
