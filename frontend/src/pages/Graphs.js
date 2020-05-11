import React, { useState, useEffect } from 'react';

import { BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Label} from 'recharts'

const Graphs = props => {

	const [groceryData, setGroceryData] = useState([]);
	const [miscellaneousData, setMiscellaneousData] = useState([]);
	const [totalData, setTotalData] = useState([]);

	useEffect(() => {
		const newGArray = [];
		const newMArray = [];
		const newTArray = [];

		if(props.months) {
			for(let i = 0; i < props.months.length; i++) {
				let name = props.months[i].month + ' ' + props.months[i].year;

				let kgData = props.months[i].users[0].grocery;
				let kmData = props.months[i].users[0].miscellaneous;
				let ktData = props.months[i].users[0].total;

				let mgData = props.months[i].users[1].grocery;
				let mmData = props.months[i].users[1].miscellaneous;
				let mtData = props.months[i].users[1].total;

				let millergData = props.months[i].users[2].grocery;
				let millermData = props.months[i].users[2].miscellaneous;
				let millertData = props.months[i].users[2].total;

				const newGData = {
					"name": name,
					"Keegan": kgData,
					"Milena": mgData,
					"Miller": millergData,
				}
				const newMData = {
					"name": name,
					"Keegan": kmData,
					"Milena": mmData,
					"Miller": millermData,
				}
				const newTData = {
					"name": name,
					"Keegan": ktData,
					"Milena": mtData,
					"Miller": millertData,
				}

				newGArray.push(newGData);
				newMArray.push(newMData);
				newTArray.push(newTData);
			}
		}
		setGroceryData(newGArray);
		setMiscellaneousData(newMArray);
		setTotalData(newTArray);
	}, [])



	return (
		<div style={{marginTop: "3rem"}}>
			<div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
				<p style={{margin: "0", padding: "0", color: "#66FCF1"}}>Keegan</p>
				<div style={{marginLeft: "0.5rem", marginRight: "2rem", backgroundColor: "#66FCF1", height: "1rem", width: "1rem"}}></div>
				<p style={{margin: "0", padding: "0", color: "#66FCF1"}}>Milena</p>
				<div style={{marginLeft: "0.5rem", marginRight: "2rem", backgroundColor: "#8884d8", height: "1rem", width: "1rem"}}></div>
				<p style={{margin: "0", padding: "0", color: "#66FCF1"}}>Miller</p>
				<div style={{marginLeft: "0.5rem", marginRight: "2rem", backgroundColor: "#82ca9d", height: "1rem", width: "1rem"}}></div>
			</div>
			<div style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridGap: "2rem", marginTop: "1rem"}}>
				<div>
					<h3 style={{color: "#66FCF1", textAlign: "center"}}>Total Spent Each Month</h3>
					<ResponsiveContainer width="95%" height={300} label="groceries">
						<BarChart width={800} height={250} data={totalData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip cursor={{fill: 'transparent'}}/>
							<Bar name="Keegan" dataKey="Keegan" fill="#66FCF1" />
							<Bar name="Milena" dataKey="Milena" fill="#8884d8" />
							<Bar name="Miller" dataKey="Miller" fill="#82ca9d" />
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div>
					<h3 style={{color: "#66FCF1", textAlign: "center"}}>Money Spent on Groceries Each Month</h3>
					<ResponsiveContainer width="95%" height={300} label="groceries">
						<BarChart width={800} height={250} data={groceryData}
  							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
  							<CartesianGrid strokeDasharray="3 3" />
  							<XAxis dataKey="name" />
  							<YAxis />
  							<Tooltip cursor={{fill: 'transparent'}}/>
  							<Bar name="Keegan" dataKey="Keegan" fill="#66FCF1" />
  							<Bar name="Milena" dataKey="Milena" fill="#8884d8" />
							<Bar name="Miller" dataKey="Miller" fill="#82ca9d" />
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div>
					<h3 style={{color: "#66FCF1", textAlign: "center"}}>Money Spent on Miscellaneous Each Month</h3>
					<ResponsiveContainer width="95%" height={300} label="groceries">
						<BarChart width={800} height={250} data={miscellaneousData}
  							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
  							<CartesianGrid strokeDasharray="3 3" />
  							<XAxis dataKey="name" />
  							<YAxis />
  							<Tooltip cursor={{fill: 'transparent'}}/>
  							<Bar name="Keegan" dataKey="Keegan" fill="#66FCF1" />
  							<Bar name="Milena" dataKey="Milena" fill="#8884d8" />
							<Bar name="Miller" dataKey="Miller" fill="#82ca9d" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}

export default Graphs;
