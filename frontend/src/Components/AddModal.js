import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import Button from './Button';
import { CSSTransition } from 'react-transition-group';
import { TextField } from '@material-ui/core';

import './Modal.css';

const ModalOverlay = props => {
	const content=(
		<div className={`modal ${(props.className)}`}>
		<div className="modal__conent" style={{marginLeft: "1rem", marginRight: "0.3rem"}}>
			<h4 style={{textAlign: "center"}}>Add Amounts to total for {props.name}</h4>
			<form style={{display: "flex", flexDirection: "column", alignItems: "center"}} onSubmit={props.addAmounts}>
			<input
				type="number"
				step="0.01"
				className="formInputs"
				placeholder="Rent"
				value={props.rent}
				onChange={props.changeRent}
			/>
			<input
				type="number"
				step="0.01"
				className="formInputs"
				placeholder="Internet"
				value={props.internet}
				onChange={props.changeInternet}
			/>
			<input
				type="number"
				step="0.01"
				className="formInputs"
				placeholder="Phone"
				value={props.phone}
				onChange={props.changePhone}
			/>
			<input
				type="number"
				step="0.01"
				className="formInputs"
				placeholder="Car Insurance"
				value={props.carInsurance}
				onChange={props.changeCarInsurance}
			/>
			<input
				type="number"
				step="0.01"
				className="formInputs"
				placeholder="Hydro"
				value={props.hydro}
				onChange={props.changeHydro}
			/>
			<input
				type="number"
				step="0.01"
				className="formInputs"
				placeholder="Grocery"
				value={props.grocery}
				onChange={props.changeGrocery}
			/>
			<input
				type="number"
				step="0.01"
				className="formInputs"
				placeholder="Miscellaneous"
				value={props.miscellaneous}
				onChange={props.changeMiscellaneous}
			/>
			<Button type="submit" name="Add Amounts" class={"btnPay"} style={{marginBottom: "1rem"}}/>
			</form>
		</div>
		</div>
	)
	return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
};

const Modal = props => {
	return (
		<React.Fragment>
			{props.show && <Backdrop class="menuBackdrop" onClick={props.onCancel}/>}
			<CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
				<ModalOverlay {...props}/>
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
