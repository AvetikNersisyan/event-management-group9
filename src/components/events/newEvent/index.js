import './index.css';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../../api';
import { addEvent } from '../../../redux/ducks/eventDuck';
import { toBase64 } from '../../../helper/utils';

const NewEvent = () => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [tag, setTag] = useState('');
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');

	const [location, setLocation] = useState('');
	const [address, setAddress] = useState('');
	const [ticketCount, setTicketCount] = useState(null);
	const [image, setImage] = useState('');

	const dispatch = useDispatch();

	const imageRef = useRef(null);

	const imageSelectHandler = (ref) => {
		toBase64(ref)
			.then((resp) => setImage(resp))
			.catch((err) => console.error(err));
	};

	const newEvent = {
		title,
		description: text,
		price: 10.99,
		img_url: image,
		tags: [tag],
		event_details: {
			start_date: start,
			end_date: end,
			start_time: '00:00',
			end_time: '00:00',
			location,
			address,
			guest_quantity: ticketCount,
			available_seats: ticketCount,
		},
		speakers: [
			{
				name: 'Poghos Petrosyan',
				rating: 4.9,
			},
		],
	};

	const submitHandler = (e) => {
		e.preventDefault();
		fetch(`${api}/events/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newEvent),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res, 'res');
				dispatch(addEvent(newEvent));
			})
			.catch((err) => console.warn(err));
	};

	return (
		<div className={'new-event-container'}>
			<form className={'new-event-form'} onSubmit={submitHandler}>
				<fieldset className={'event-title'}>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder={'Event Title'}
						required={true}
					/>
					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder={'Event text'}
						required={true}
					/>
				</fieldset>

				<input
					value={tag}
					onChange={(e) => setTag(e.target.value)}
					placeholder={'tags..'}
				/>

				<div className={'start-end-date'}>
					<input
						value={start}
						onChange={(e) => setStart(e.target.value)}
						type={'date'}
					/>
					<input
						value={end}
						onChange={(e) => setEnd(e.target.value)}
						type={'date'}
					/>
				</div>

				<input
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder={'Location'}
				/>
				<input
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder={'address'}
				/>

				<input
					min={0}
					value={ticketCount}
					onChange={(e) => setTicketCount(e.target.value)}
					type={'number'}
					placeholder={'avavilable tickets'}
				/>

				<div className={'file'}>
					<input
						onChange={(e) => imageSelectHandler(e.target.files[0])}
						ref={imageRef}
						type={'file'}
					/>
					<button className={'btn primary'} type={'submit'}>
						Add event
					</button>
					<img src={image} />
				</div>
			</form>
		</div>
	);
};

export default NewEvent;
