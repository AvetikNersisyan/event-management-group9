import './index.css';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../../../api';
import { addEvent } from '../../../redux/ducks/eventDuck';
import { toBase64 } from '../../../helper/utils';

const NewEvent = () => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [tag, setTag] = useState([]);
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');

	const [location, setLocation] = useState('');
	const [address, setAddress] = useState('');
	const [ticketCount, setTicketCount] = useState(null);
	const [image, setImage] = useState('');

	const dispatch = useDispatch();

	const imageRef = useRef(null);
	const tagElement = useRef(null)


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

	const inputFile = () => {
		imageRef.current.click()
	}

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

	const addTag = () => {
		let newTag = tagElement.current.value
		if (newTag === '') {
			alert('Please type some tag')
		} else {
			setTag([...tag, newTag]);
			tagElement.current.value = '';
		}
	};

	const removeTag = (e) => {
		let id = e.item
		const newInt = tag.filter((item) => item !== id)
		setTag(newInt);
	}

	return (
		<div className={'new-event-page global-conteiner'}>
			<form className={'new-event-conteiner'} onSubmit={submitHandler}>
				<fieldset className={'event-title'}>
					<input
						className='new-event-title-inputs'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder={'Event Title'}
						required={true}
					/>
					<textarea
						style={{ padding: '10px' }}
						className='new-event-title-inputs'
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder={'Event text'}
						required={true}
					/>
				</fieldset>

				<div className='tag-stroke'>
					<div>
						{tag?.map((item) => (
							<span className='tag-item'>
								<span>{item}</span>
								<button className='remove-button' onClick={() => removeTag({ item })}>X</button>
							</span>
						))}
					</div>
					<div className='tag-input'>
						<input className='new-event-inputs' type="search" ref={tagElement} placeholder='tags..' />
						<button className='button' onClick={addTag}>Add</button>
					</div>
				</div>

				<div className={'new-event-stroks'}>
					<input
						className='new-event-inputs'
						value={start}
						onChange={(e) => setStart(e.target.value)}
						type={'date'}
					/>
					<input
						className='new-event-inputs'
						value={end}
						onChange={(e) => setEnd(e.target.value)}
						type={'date'}
					/>
				</div>
				<div className='new-event-stroks'>
					<input
						className='new-event-inputs'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						placeholder={'Location'}
					/>
					<input
						className='new-event-inputs'
						min={0}
						value={ticketCount}
						onChange={(e) => setTicketCount(e.target.value)}
						type={'number'}
						placeholder={'avavilable tickets'}
					/>
				</div>
				<div className='new-event-stroks'>
					<input
						className='new-event-inputs'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder={'address'}
					/>
				</div>
				<div>
					<input
						style={{ display: 'none' }}
						className='new-event-inputs'
						id='coteined-button-file'
						onChange={(e) => imageSelectHandler(e.target.files[0])}
						ref={imageRef}
						type={'file'}
					/>
					<label htmlFor='contained-button-file'>
						<button className='button' onClick={inputFile}>
							Chosoe file
						</button>
					</label>

					<button className={'button'} type={'submit'}>
						Add event
					</button>
					<img src={image} />
				</div>
			</form>
		</div>
	);
};

export default NewEvent;
