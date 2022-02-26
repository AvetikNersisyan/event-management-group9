import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Sidebar from './sidebar';
import EventCard from './eventCard';
import Index from '../../error404';

import './index.css';

const backGroundImage =
	'https://ovatheme.com/em4u/wp-content/themes/em4u/assets/img/bg_heading-compressor.jpg';

const SingleEvent = () => {
	const events = useSelector(({ EventDuck }) => EventDuck.events);
	const [isValidUrl, setIsValidUrl] = useState(false);
	const [event, setEvent] = useState(null);

	const path = useParams();

	useEffect(() => {
		events.forEach((item, idx) => {
			item.id === +path.eventId && setIsValidUrl(true);
			item.id === +path.eventId && setEvent(item);
		});
	});

	return (
		<>
			{isValidUrl ? (
				<div className={'single-event-page'}>
					<img className={'bgImage'} src={backGroundImage} />
					<EventCard ev={event} />
					<Sidebar ev={event} {...event?.event_details} />
				</div>
			) : (
				<Index />
			)}
		</>
	);
};
export default SingleEvent;
