import React, { useState, useEffect } from 'react';
import Button from '../Components/Button';
import UserLine from '../Components/UserLine';
import MonthModal from '../Components/MonthModal';

const Main = props => {

	const [monthInfo, setMonthInfo] = useState({
		month: '',
		year: ''
	})

	const [months, setMonths] = useState();

	const [showMonthModal, setShowMonthModal] = useState(false);

	const [selectionArray, setSelectionArray] = useState([]);
	const [selection, setSelection] = useState();

	const [monthYear, setMonthYear] = useState([]);
	const [something, setSomething] = useState();

	useEffect(() => {
		const getMonths = async () => {
			try {
				const response = await fetch(`http://localhost:5000/getmonths`);
				const responseData = await response.json();

				if(!response.ok) {
					throw new Error(responseData.message)
				}

				const monthData = responseData.months;

				let newArray = [];
				for(let i = 0; i < monthData.length; i++) {
					newArray.push(monthData[i].month + ' ' + monthData[i].year)
				}

				const index = monthData.length - 1;

				setMonthYear(newArray);
				setSelection(monthData[index].month + ' ' + monthData[index].year)
				setMonths(monthData)

			} catch (err) {

			}
		}
		getMonths();
	}, [something])

	const addMonth = async event => {
		event.preventDefault();
		try {
			const response = await fetch(`http://localhost:5000/addmonth`, {
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
		setSomething("hi");
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

	const changeSelection = event => {
		setSelection(event.target.value)
	}

	return (
		<div className="container">
			<div style={{display: "flex", flexDirection: "row"}}>
				{months &&
					<select
						value={selection}
						onChange={changeSelection}
						className="selectMonth"
					>
					{months.map((month, i) => (
						<option key={month.month + month.year} value={month.month + ' ' + month.year}>
							{month.month + ' ' + month.year}
						</option>
					))}
				</select>}
				<Button name="Add Month" style={{marginLeft: "1rem"}} onClick={showModal}/>
			</div>
            {months && months.length == monthYear.length && <UserLine
				users={months[monthYear.indexOf(selection)]}
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
