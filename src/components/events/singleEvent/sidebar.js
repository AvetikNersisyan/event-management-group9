import { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import Iframe from 'react-iframe';

import Popup from '../popup';
import Rating from './rating/index';


const Sidebar = ({
	ev,
	start_date,
	start_time,
	end_date,
	end_time,
	location,
	address,
	available_seats,
	guest_quantity,
}) => {
	const activeUser = useSelector(({ UserDuck }) => UserDuck.activeUser);
	const [isOpen, setIsOpen] = useState(false);

	const onBuyTicket = () => {
		setIsOpen((prev) => !prev);
	};

	const onPopupClose = useCallback(() => setIsOpen(false), [isOpen]);

	return (
		<div className={'sidebar'}>
			{
				activeUser?.type === 'admin' ? '' : <button onClick={onBuyTicket}> ATTEND </button>
			}


			<div className={'event-details'}>
				{isOpen && <Popup ev={ev} close={onPopupClose} />}
			</div>
			<div className={'event-details'}>
				<div className='event-detail-info'>
					<label> rating </label>
					<span>
						{' '}
						<Rating ev={ev} activeUser={activeUser} />
					</span>
				</div>
				<h3> Event detail</h3>
				<div className={'event-detail-info'}>
					<label> Start date: </label>
					<span>
						{' '}
						{start_date} {start_time}
					</span>
				</div>
				<div className={'event-detail-info'}>
					<label> End date: </label>
					<span>
						{' '}
						{end_date} {end_time}
					</span>
				</div>

				<div className={'event-detail-info'}>
					<label> Location: </label>
					<span> {location} </span>
				</div>

				<div className={'event-detail-info'}>
					<label> Address: </label>
					<span> {address} </span>
				</div>

				<div className={'event-detail-info'}>
					<label> Seats: </label>
					<span>
						{' '}
						{available_seats}/ {guest_quantity}{' '}
					</span>
				</div>
				<div className={'event-detail-info'}>
					<Iframe
						url='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.8162940368825!2d44.510153515389156!3d40.190901579392026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd1f2b141a7b%3A0xbdc90e63fc589ca6!2s14%20Marshal%20Baghramyan%20Ave%2C%20Yerevan%200019!5e0!3m2!1sen!2s!4v1645282013489!5m2!1sen!2s'
						width='300 px'
						height='300 px'
						style='border:0;'
						allow='fullscreen'
						loading='lazy'
					/>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
