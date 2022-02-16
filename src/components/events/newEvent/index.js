import './index.css';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../api';
import { addEvent } from '../../../redux/ducks/eventDuck';
import { toBase64 } from '../../../helper/utils';
import { eventTypes, professionTypes } from '../../../helper/constants';

const NewEvent = () => {
	const persons = useSelector((state) => state.PersonsDuck.persons);
	const [eventType, setEventType] = useState('');
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [tag, setTag] = useState([]);
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');

	const [location, setLocation] = useState('');
	const [address, setAddress] = useState('');
	const [ticketCount, setTicketCount] = useState(null);
	const [image, setImage] = useState('');
	const [newEventSpeakers, setNewEventSpeakers] = useState([]);

	const [addPerson, setAddPerson] = useState(false);
	const [personFirstName, setPersonFirstName] = useState('');
	const [personLastName, setPersonLastName] = useState('');
	const [personDoB, setPersonDoB] = useState('');
	const [personBio, setPersonBio] = useState('');
	const [profession, setProfession] = useState('');

	const [addOrganizator, setAddOrganizator] = useState(false);
	const [companyName, setCompanyName] = useState('');
	const [fieldOfActivity, setFieldOfActivity] = useState('');
	const [aboutCompany, setAboutCompany] = useState('');

	const dispatch = useDispatch();

	const imageRef = useRef(null);
	const tagElement = useRef(null);

	const imageSelectHandler = (ref) => {
		toBase64(ref)
			.then((resp) => setImage(resp))
			.catch((err) => console.error(err));
	};

	const newEvent = {
		type: eventType,
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
		imageRef.current.click();
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

	const addTag = () => {
		let newTag = tagElement.current.value;
		if (newTag === '') {
			alert('Please type some tag');
		} else {
			setTag([...tag, newTag]);
			tagElement.current.value = '';
		}
	};

	const removeTag = (e) => {
		let id = e.item;
		const newInt = tag.filter((item) => item !== id);
		setTag(newInt);
	};

	const changeEventType = (e) => {
		setEventType(e.target.value);
	};

	const changeProfessionType = (e) => {
		setProfession(e.target.value);
	};

	const handleAddPerson = () => {
		let newPerson = {
			type: 'person',
			firstname: personFirstName,
			lastname: personLastName,
			DoB: personDoB,
			profession: profession,
			about: personBio,
		};
		console.log(newPerson);
		// fetch(`${api}/persons`, {
		// 	method: 'POST',
		// 	body: JSON.stringify(newPerson),
		// 	headers: {
		// 		"Content-type": "application/json; charset=UTF-8"
		// 	}
		// })
		// 	.then((response) => response.json())
		// 	.then((json) => setNewEventSpeakers([...newEventSpeakers, json]))
		// 	.then(() => setAddPerson(false));
	};

	const handleAddCompany = () => {
		let newCompany = {
			type: 'company',
			name: companyName,
			fieldOfActivity: fieldOfActivity,
			about: aboutCompany,
		};
		console.log(newCompany);
		// fetch(`${api}/persons`, {
		// 	method: 'POST',
		// 	body: JSON.stringify(newCompany),
		// 	headers: {
		// 		'Content-type': 'application/json; charset=UTF-8',
		// 	},
		// })
		// 	.then((response) => response.json())
		// 	.then(json => setNewEventSpeakers([...newEventSpeakers, json]))
		// 	.then(() => setAddOrganizator(false));
	};

	return (
		<div className={'new-event-page global-conteiner'}>
			<form className={'new-event-conteiner'} onSubmit={submitHandler}>
				<fieldset className={'event-title'}>
					<div className='event-title-type'>
						<input
							className='new-event-title-inputs'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder={'Event Title'}
							required={true}
						/>
						<select
							className='new-event-title-inputs'
							value={eventType}
							onChange={changeEventType}
						>
							{eventTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>
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
								<button
									className='remove-button'
									onClick={() => removeTag({ item })}
								>
									X
								</button>
							</span>
						))}
					</div>
					<div className='tag-input'>
						<input
							className='new-event-inputs'
							type='search'
							ref={tagElement}
							placeholder='tags..'
						/>
						<button className='button' onClick={addTag}>
							Add
						</button>
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
					<img src={image} />
				</div>
				<div className='new-event-stroks'>
					<button className='button' onClick={() => setAddPerson(!addPerson)}>
						Person
					</button>
					<button
						className='button'
						onClick={() => setAddOrganizator(!addOrganizator)}
					>
						Add Organizator
					</button>
				</div>

				{addOrganizator ? (
					<>
						<div className='event-title-type'>
							<input
								className='new-event-title-inputs'
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								placeholder={'Company name'}
								required={true}
							/>
							<input
								className='new-event-title-inputs'
								value={fieldOfActivity}
								onChange={(e) => setFieldOfActivity(e.target.value)}
								placeholder={'Field of activity'}
								required={true}
							/>
						</div>
						<div className='new-event-stroks'>
							<textarea
								style={{ padding: '10px' }}
								className='new-event-title-inputs'
								value={aboutCompany}
								onChange={(e) => setAboutCompany(e.target.value)}
								placeholder={'About company'}
								required={true}
							/>
							<button
								className={'button'}
								type={'submit'}
								onClick={handleAddCompany}
							>
								Add Company
							</button>
						</div>
					</>
				) : (
					''
				)}

				{addPerson ? (
					<>
						<div className='event-title-type'>
							<select
								className='new-event-title-inputs'
								value={profession}
								onChange={changeProfessionType}
							>
								{professionTypes.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
							<input
								className='new-event-title-inputs'
								value={personFirstName}
								onChange={(e) => setPersonFirstName(e.target.value)}
								placeholder={'Firstname'}
								required={true}
							/>
							<input
								className='new-event-title-inputs'
								value={personLastName}
								onChange={(e) => setPersonLastName(e.target.value)}
								placeholder={'Firstname'}
								required={true}
							/>
							<input
								className='new-event-inputs'
								value={personDoB}
								onChange={(e) => setPersonDoB(e.target.value)}
								type={'date'}
							/>
						</div>
						<div className='new-event-stroks'>
							<textarea
								style={{ padding: '10px' }}
								className='new-event-title-inputs'
								value={personBio}
								onChange={(e) => setPersonBio(e.target.value)}
								placeholder={'Peson Biography'}
								required={true}
							/>
							<button
								className={'button'}
								type={'submit'}
								onClick={handleAddPerson}
							>
								Add Person
							</button>
						</div>
					</>
				) : (
					''
				)}

				<button className={'button'} type={'submit'}>
					Add event
				</button>
			</form>
		</div>
	);
};

export default NewEvent;
