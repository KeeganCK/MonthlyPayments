import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import UserLine from '../Components/UserLine';
import MonthModal from '../Components/MonthModal';

const Main = props => {

	const [monthInfo, setMonthInfo] = useState({
		month: '',
		year: ''
	})

	const [showMonthModal, setShowMonthModal] = useState(false);

	const addMonth = async event => {
		event.preventDefault();
		try {
			// const response = await fetch(`http://localhost:5000/addmonth`, {
			const response = await fetch(`https://mainexpenses.herokuapp.com/addmonth`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					month: monthInfo.month,
					year: monthInfo.year
				})
			})

			const responseData = await response.json();
			if(!response.ok) {
				throw new Error(responseData.message)
			}
		} catch (err) {

		}
		closeModal();
		props.setSomething("hi");
	}

	const showModal = () => {
		setShowMonthModal(true);
	}

	const closeModal = () => {
		setShowMonthModal(false);
	}

	const monthHandler = event => {
		setMonthInfo({
			month: event.target.value,
			year: monthInfo.year
		})
	}

	const yearHandler = event => {
		setMonthInfo({
			month: monthInfo.month,
			year: event.target.value
		})
	}

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
				<Button name="Add Month" style={{marginLeft: "1rem"}} onClick={showModal}/>
			</div>
            {props.months && props.months.length == props.monthYear.length && <UserLine
				users={props.months[props.monthYear.indexOf(props.selection)]}
				setSomething={props.setSomething}
			/>}
			<MonthModal
				show={showMonthModal}
				onCancel={closeModal}
				addMonth={addMonth}
				month={monthInfo.month}
				year={monthInfo.year}
				monthHandler={monthHandler}
				yearHandler={yearHandler}
			/>
        </div>
	);
}

export default Main;
