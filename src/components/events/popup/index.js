import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { decreaseSeats } from '../../../redux/ducks/eventDuck';
import { validate } from '../../../helper/utils';
import { setGoing } from '../../../redux/ducks/userDuck';
import { api } from '../../../api';

import './index.css';

const Popup = ({ close, ev }) => {
	const eventId = ev.id;
	const [activeUser, events] = useSelector(({ UserDuck, EventDuck }) => [
		UserDuck.activeUser,
		EventDuck.events,
	]);

	const [cardNumber, setCardNumber] = useState('');
	const [cardHolder, setCardHolder] = useState('');
	const [cardCVV, setCardCVV] = useState('');
	const [expDate, setExpDate] = useState('');
	const [expYear, setExpYear] = useState('');

	const onCardNumberChange = (e) => setCardNumber(e.target.value);
	const onNameChange = (e) => setCardHolder(e.target.value);

	const onCVVChange = (e) => setCardCVV(e.target.value);
	const onYearChange = (e) => setExpYear(e.target.value);
	const onDateChange = (e) => setExpDate(e.target.value);

	const dispatch = useDispatch();

	const onCardSubmit = (e) => {
		e.preventDefault();

		const isValid = validate(cardNumber, cardHolder, cardCVV, expDate, expYear);

		if (isValid) {
			const seatFilterEvent = events.filter(({ id }) => id === eventId);

			seatFilterEvent[0].event_details.available_seats -= 1;

			fetch(`${api}/events/${eventId}`, {
				headers: {
					'Content-type': 'application/json',
				},
				method: 'PUT',
				body: JSON.stringify(seatFilterEvent[0]),
			})
				.then((res) => res.ok && dispatch(decreaseSeats(seatFilterEvent[0])))
				.catch((err) => console.log(err));

			const newActiveUser = {
				...activeUser,
				going: [...activeUser.going, ev],
			};

			fetch(`${api}/users/${activeUser.id}`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(newActiveUser),
			});

			dispatch(setGoing(newActiveUser));
			close();
		}
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

					<div className={'card-details'}>
						<input
							type={'number'}
							value={expDate}
							onChange={onDateChange}
							placeholder={'expiration date'}
						/>
						<input
							type={'number'}
							value={expYear}
							onChange={onYearChange}
							placeholder={'expiration year'}
						/>

						<input
							type={'tel'}
							value={cardCVV}
							onChange={onCVVChange}
							placeholder={'CVV'}
						/>
					</div>

					<input
						value={cardHolder}
						onChange={onNameChange}
						placeholder={'name surname'}
					/>

					<div className={'buttons'}>
						<button type={'button'} onClick={close}>
							{' '}
							close
						</button>
						<button type={'submit'} onClick={onCardSubmit}>
							{' '}
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Popup;
