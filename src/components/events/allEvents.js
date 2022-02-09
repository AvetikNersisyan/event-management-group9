import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AllEvents = () => {
	const events = useSelector(({ EventDuck }) => EventDuck.events);
	const navigate = useNavigate();

	const handleEventClick = (id) => {
		navigate(`/events/${id}`);
	};

	return (
		<div className={'events'}>
			{events.map(({ title, description, id, img_url }) => (
				<div
					key={id}
					onClick={() => handleEventClick(id)}
					className={'single-event-container'}
				>
					<div className={'event-title'}>
						<h3>{title}</h3>
						<p>{id}</p>
					</div>
					<img className={'event-image-medium'} src={img_url} />
				</div>
			))}
		</div>
	);
};

export default AllEvents;
