import { useSelector } from 'react-redux';
import EventCard from './eventCard';
import './index.css';
import { useParams } from 'react-router-dom';
import './index.css';
import Sidebar from './sidebar';
import { useCallback } from 'react';
import Index from '../../error404';

const backGroundImage =
	'https://ovatheme.com/em4u/wp-content/themes/em4u/assets/img/bg_heading-compressor.jpg';

const SingleEvent = () => {
	const events = useSelector(({ EventDuck }) => EventDuck.events);

	const path = useParams();
	const event = events[path.eventId - 1];

	const validateEventPath = useCallback(
		() => events.length >= path.eventId && path.eventId >= 1,
		[events.length, path.eventId]
	);

	return (
		<>
			{validateEventPath() ? (
				<div className={'single-event-page'}>
					<img className={'bgImage'} src={backGroundImage} />

					<EventCard {...event} />
					<Sidebar {...event?.event_details} />
				</div>
			) : (
				<Index />
			)}
		</>
	);
};
export default SingleEvent;
