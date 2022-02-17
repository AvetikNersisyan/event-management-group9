import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';
import { useCallback, useRef, useState } from 'react';
import Popup from '../events/popup';
const Checkout = () => {
	const { eventID } = useParams();
	const popupRef = useRef(null);

	const event = useSelector(
		({ EventDuck }) =>
			EventDuck.events.filter((event) => event.id === +eventID)[0]
	);

	const [isOpen, setIsOpen] = useState(false);

	const onBuyTicket = () => {
		setIsOpen((prev) => !prev);
	};

	const onPopupClose = useCallback(() => setIsOpen(false));

	return (
		<>
			<div className={'event-checkout'}>
				<h3> {event.title}</h3>
				<img src={event.img_url} />

				<button onClick={onBuyTicket}> buy ticket</button>
			</div>

			{isOpen && <Popup close={onPopupClose} />}
		</>
	);
};
export default Checkout;
