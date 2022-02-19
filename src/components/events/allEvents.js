import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../categories';

const AllEvents = () => {
	const events = useSelector(({ EventDuck }) => EventDuck.events);
	const navigate = useNavigate();
	events.sort((a, b) => new Date(a.event_details.start_date) - new Date(b.event_details.start_date))
	const [eventsList, setEventsList] = useState(events.filter((items) => new Date(items.event_details.start_date).getTime() > new Date().getTime()))
	const [cityFilter, setCityFilter] = useState('')

	const handleEventClick = (id) => {
		navigate(`/events/${id}`);
	};

	const handleFilter = (obj) => {

		let filtered = events.filter((items) => new Date(items.event_details.start_date).getTime() > new Date().getTime()).filter(item => {
			return item.title.toLowerCase() === obj.title.toLowerCase() ||
				item.event_details.location.toLowerCase() === obj.location.toLowerCase() ||
				item.type.toLowerCase() === obj.type.toLowerCase() ||
				item.event_details.start_date === obj.start_date ||
				item.event_details.end_date === obj.end_date ||
				item.tags.indexOf(obj.tags) >= 0
		})
		setEventsList(filtered);
	}

	const cancelSearch = () => {
		setEventsList(events.filter((items) => new Date(items.event_details.start_date).getTime() > new Date().getTime()))
	}

	return (
		<div>
			<Categories handleFilter={(obj) => handleFilter(obj)} cancelSearch={cancelSearch} />
			<h1>All Upcoming Events</h1>
			<div className='profile-event-list'>
				{eventsList.map(({ title, description, id, img_url }) => (
					<div key={id} className="profile-event-card" onClick={() => handleEventClick(id)}>
						<div className='profile-card-content'>
							<img className="profile-event-img" src={img_url} />
							<div className='profile-about-event'>
								<h2>{title}</h2>
								<p>{description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllEvents;
