import React, { useState } from 'react';
import Button from './Button';

const UserGrocery = props => {

	const [total, setTotal] = useState(0);
	const [items, setItems] = useState([]);
	const [item, setItem] = useState();

	const changeItemHandler = event => {
		setItem(event.target.value)
	}

	const addItem = event => {
		event.preventDefault();
		let tempTotal = total;
		tempTotal = parseFloat(tempTotal) + parseFloat(item);
		setTotal(tempTotal);

		const newArray = [...items];
		newArray.push(item);
		setItems(newArray);
		setItem('');
	}

	const addToTotal = async event => {
		try {
			// const response = await fetch(`http://localhost:5000/addamounts`, {
			const response = await fetch(`https://mainexpenses.herokuapp.com/addamounts`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({
					name: props.name,
					grocery: total,
					id: props.id
				})
			})

			const responseData = response.json();

			if(!response.ok) {
				throw new Error(responseData.message)
			}
			setItems([]);
			setItem('');
			setTotal(0);
			props.setSomething(total);
		} catch (err) {

		}
	}

	const removeItem = event => {
		const newArray = [...items];
		const value = event.target.value;
		const index = newArray.indexOf(value);
		if( index > -1) {
			newArray.splice(index, 1);
		}
		setItems(newArray);

		let tempTotal = total;
		tempTotal = parseFloat(tempTotal) - parseFloat(value);
		if(tempTotal === -0) {
			tempTotal = 0;
		}
		setTotal(tempTotal);
	}

	const clearList = () => {
		setItems([]);
		setTotal(0);
	}

	return (
		<div className="user">
			<h4>Groceries for {props.name}</h4>
			<p>Cost so far: {props.grocery.toFixed(2)}</p>
			<form onSubmit={addItem}>
			<div style={{display: "flex", flexDirection: "row"}}>
				<input className="formInputsGrocery" placeholder="Cost of single item" value={item} onChange={changeItemHandler}/>
				<Button className="groceryBtn" name="+" type="submit"/>
			</div>
			</form>
			{items.length > 0 && <div style={{marginLeft: "2.5%", marginRight: "2.5%"}}>
				<table className="table">
					<th>#</th>
					<th>Cost</th>
					<th>remove</th>
				{items.map((item, i) => (
					<tr>
						<td>{i + 1}</td>
						<td>${item}</td>
						<td><Button name="-" className="minusBtn" onClick={removeItem} value={item}/></td>
					</tr>
				))}
				</table>
				<Button name="Clear List" onClick={clearList} />
			</div>}
			<h4>Total: ${total.toFixed(2)}</h4>
			<hr style={{width: "99%", border: "1.2px solid #66FCF1"}}/>
			<Button name="Add to Grocery Total" value={total} style={{marginTop: "0.5rem"}} onClick={addToTotal}/>
		</div>
	);
}

export default UserGrocery;
