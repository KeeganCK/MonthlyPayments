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
			<h4 style={{textAlign: "center"}}>Add a Month</h4>
			<form style={{display: "flex", flexDirection: "column", alignItems: "center"}} onSubmit={props.addMonth}>
			<input
				type="text"
				className="formInputs"
				placeholder="Month"
				value={props.month}
				onChange={props.monthHandler}
			/>
			<input
				type="number"
				className="formInputs"
				placeholder="Year"
				value={props.year}
				onChange={props.yearHandler}
			/>
			<Button name="Add Month" style={{marginBottom: "1rem"}} type="submit"/>
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
