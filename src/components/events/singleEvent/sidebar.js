import { api } from '../../../api';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../../redux/ducks/eventDuck';

const ev = {
	id: 3,
	title: 'Lorem Ipsum esim',
	description:
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n \n\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
	price: 10.99,
	img_url: 'https://www.pcma.org/wp-content/uploads/2018/10/trillion-main.jpg',
	tags: ['music', 'sport'],
	event_details: {
		start_date: '01/01/01',
		end_date: '01/01/01',
		start_time: '15:00',
		end_time: '18:00',
		location: 'Yerevan',
		address: 'Baghramyan 26',
		guest_quantity: 100,
		available_seats: 17,
	},
	speakers: [
		{
			name: 'Poghos Petrosyan',
			rating: 4.9,
		},
	],
};

const Sidebar = ({
	start_date,
	start_time,
	end_date,
	end_time,
	location,
	address,
}) => {
	const dispatch = useDispatch();

	const newEventHandler = (newEvent) => {
		fetch(`${api}/events/${newEvent.id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})
			.then((res) => res.json())
			.then((res) => {
				// navigate('..')
				console.log(res, 'res in POST');
				console.log(newEvent, 'new event');
				dispatch(addEvent({ ...newEvent, ...res }));
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className={'sidebar'}>
			<button> ATTEND </button>
			<button onClick={() => newEventHandler(ev)}> Add New Event </button>
			<div className={'event-details'}>
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
			</div>
		</div>
	);
};

export default Sidebar;
