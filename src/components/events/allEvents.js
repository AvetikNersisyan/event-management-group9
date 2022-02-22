import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../categories';
import EventCard from '../eventCard';

const AllEvents = () => {
	const events = useSelector(({ EventDuck }) => EventDuck.events);

	const navigate = useNavigate();
	// events.sort(
	// 	(a, b) =>
	// 		new Date(a.event_details.start_date) -
	// 		new Date(b.event_details.start_date)
	// );

	const [searching, setSearching] = useState(false);
	const [eventsList, setEventsList] = useState(
		events.filter(
			(items) =>
				new Date(items.event_details.start_date).getTime() >
				new Date().getTime()
		)
	);

	const handleEventClick = (id) => {
		navigate(`/events/${id}`);
	};

	const handleFilter = (obj) => {
		setSearching(true);

		for (let value in obj) {
			if (!obj[value]) {
				delete obj[value];
			}
		}

		let searchTerms = Object.keys(obj);
		searchTerms = searchTerms.filter((t) => !t.includes('date'));

		let tempObj;
		let filtered = events;

		searchTerms.forEach((term) => {
			filtered = filtered.filter((item) => {
				tempObj = {
					title: item.title,
					tags: item.tags.join(' '),
					location: item.event_details.location,
					type: item.type,
					start_date: item.event_details.start_date,
					end_date: item.event_details.end_date,
				};

				return tempObj[term]?.includes(obj[term]);
			});
		});

		filtered = filtered.filter((event) => {
			return (
				new Date(event.event_details.start_date).getTime() >
					new Date(obj.start_date).getTime() &&
				new Date(event.event_details.start_date).getTime() <
					new Date(obj.end_date).getTime()
			);
		});

		console.log(filtered, 'filtered');

		setEventsList(filtered);
	};

	const cancelSearch = () => {
		setSearching(false);
		setEventsList(
			events.filter(
				(items) =>
					new Date(items.event_details.start_date).getTime() >
					new Date().getTime()
			)
		);
	};

	return (
		<div>
			<Categories
				handleFilter={(obj) => handleFilter(obj)}
				cancelSearch={cancelSearch}
			/>
			{!searching ? <h1>All Upcoming Events</h1> : <h1>Your search</h1>}
			<div className='profile-event-list'>
				{eventsList.map((item) => (
					<EventCard
						key={item.id}
						item={item}
						handleEventClick={(id) => handleEventClick(id)}
					/>
				))}
			</div>
		</div>
	);
};

export default memo(AllEvents);
