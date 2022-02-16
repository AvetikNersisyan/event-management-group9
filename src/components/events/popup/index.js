import './index.css';
import { useState } from 'react';

let valid = require('card-validator');
let a = valid.number(4555);
let name = valid.cardholderName('av');

const Popup = ({ close }) => {
	const [cardNumber, setCardNumber] = useState('');
	const onCardNumberChange = (e) => setCardNumber(e.target.value);

	const [isValid, setIsValid] = useState(false);

	const onCardSubmit = (e) => {
		e.preventDefault();
		setIsValid(valid.number(cardNumber).isValid);
	};

	const onOverlayClick = (e) => {
		e.target.className === 'background-popup' && close();
	};

	return (
		<div onClick={onOverlayClick} className={'background-popup'}>
			<div className={'checkout-popup'}>
				<form onSubmit={onCardSubmit}>
					<input
						value={cardNumber}
						onChange={onCardNumberChange}
						placeholder={'card number'}
					/>

					<input placeholder={'expiration date'} />
					<input placeholder={'name surname'} />

					<button type={'button'} onClick={close}>
						{' '}
						close
					</button>
					<button type={'submit'} onClick={onCardSubmit}>
						{' '}
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Popup;
