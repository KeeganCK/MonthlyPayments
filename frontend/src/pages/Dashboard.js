import React, { useState, useEffect } from 'react';
import Main from './Main';
import Graphs from './Graphs';
import GroceryCalc from './GroceryCalc';
import Button from '../Components/Button';

const Dashboard = props => {

	const [selection, setSelection] = useState("main");

	const [selectionArray, setSelectionArray] = useState([]);
	const [selectionMonth, setSelectionMonth] = useState('');

	const [monthYear, setMonthYear] = useState([]);
	const [something, setSomething] = useState();

	const [months, setMonths] = useState();

	const changeSelection = event => {
		console.log(event.target.value);
		setSelection(event.target.value);
	}

	const changeSelectionMonth = event => {
		console.log(event.target.value)
		setSelectionMonth(event.target.value)
	}

	useEffect(() => {
		const getMonths = async () => {
			try {
				const response = await fetch(`https://mainexpenses.herokuapp.com/getmonths`);
				// const response = await fetch(`http://localhost:5000/getmonths`);
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
				if(selectionMonth === '') {
					setSelectionMonth(monthData[index].month + ' ' + monthData[index].year)
				}
				setMonths(monthData)

			} catch (err) {

			}
		}
		getMonths();
	}, [something, selectionMonth])

	return (
		<React.Fragment>
			<div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: "5rem", gridGap: "1rem", marginLeft: "2.5%", marginRight: "2.5%"}}>
				{selection === "main" ? <Button className="btnActive" name="Monthly Expenses" value="main" /> : <Button name="Monthly Expenses" value="main" onClick={changeSelection}/> }
				{selection === "charts" ? <Button className="btnActive" name="Graphs" value="charts"/> : <Button name="Graphs" value="charts" onClick={changeSelection}/>}
				{selection === "grocery" ? <Button className="btnActive" name="Grocery Calculator" value="grocery"/> : <Button name="Grocery Calculator" value="grocery" onClick={changeSelection}/>}
			</div>
			<div>
				{selection === "main" &&
					<Main
						setSomething={setSomething}
						selection={selectionMonth}
						changeSelection={changeSelectionMonth}
						setSelection={setSelectionMonth}
						months={months}
						monthYear={monthYear}
					/>
				}
				{selection === "grocery" && months &&
					<GroceryCalc
						setSomething={setSomething}
						month={months[monthYear.indexOf(selectionMonth)]}
						selection={selectionMonth}
						changeSelection={changeSelectionMonth}
						setSelection={setSelectionMonth}
						months={months}
						monthYear={monthYear}
					/>
				}
				{selection === "charts" && <Graphs months={months} />}
			</div>
		</React.Fragment>
	);
}

export default Dashboard;
