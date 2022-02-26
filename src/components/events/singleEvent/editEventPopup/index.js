import { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../../api';
import { eventHandler, toBase64 } from '../../../../helper/utils';
import { addEvent } from '../../../../redux/ducks/eventDuck';
import { eventTypes, professionTypes } from '../../../../helper/constants';
import AddPerson from '../../newEvent/addPerson';

import './style.css';

const EditEventPopup = ({ ev, editHandler }) => {
	const tagElement = useRef(null);
	// const navigate = useNavigate();

	const data = useSelector(({ PersonsDuck }) => PersonsDuck.persons);
	// const state = useSelector((state) => state);

	// const [persons] = useState(data.filter((item) => item.type === 'person'));
	// const [companys] = useState(data.filter((item) => item.type === 'company'));
	// const [personInput, setPersonInput] = useState('');
	// const [companyInput, setCompanyInput] = useState('');

	const [eventType, setEventType] = useState(ev.type || '');

	const [title, newTitle] = useState(ev.title);
	const [desc, newDesc] = useState(ev.description);
	const [startDate, newStartDate] = useState(ev.event_details.start_date);
	const [endDate, newEndDate] = useState(ev.event_details.end_date);
	const [endTime, newEndTime] = useState(ev.event_details.end_time);
	const [startTime, newStartTime] = useState(ev.event_details.end_time);
	const [tag, setTag] = useState(ev.tags);
	const [price, newPrice] = useState(ev.price);
	const [location, newLocation] = useState(ev.event_details.location);
	const [address, newAddress] = useState(ev.event_details.address);
	const [availableSeats, newAvailableSeats] = useState(
		ev.event_details.available_seats
	);

	const endDateHandler = eventHandler(newEndDate);
	const startDateHandler = eventHandler(newStartDate);
	const endTimeHandler = eventHandler(newEndTime);
	const startTimeHandler = eventHandler(newStartTime);
	const priceHandler = eventHandler(newPrice);
	const locationHandler = eventHandler(newLocation);
	const addressHandler = eventHandler(newAddress);
	const availableSeatsHandler = eventHandler(newAvailableSeats);

	const [image, setImage] = useState(ev.img_url);
	const [newEventSpeakers, setNewEventSpeakers] = useState(ev.speakers);

	const [addPerson, setAddPerson] = useState(false);
	const [profession, setProfession] = useState('');

	// const [addOrganizator, setAddOrganizator] = useState(false);

	const dispatch = useDispatch();

	const imageRef = useRef(null);

	const descHandler = eventHandler(newDesc);
	const titleHandler = eventHandler(newTitle);

	const imageSelectHandler = (ref) => {
		toBase64(ref)
			.then((resp) => setImage(resp))
			.catch((err) => console.error(err));
	};

	const inputFile = () => {
		imageRef.current.click();
	};

	const submitHandler = (e) => {
		e.preventDefault();
		editHandler();
		let changedEvent = {
			type: eventType,
			title: title,
			description: desc,
			price: price,
			img_url: image,
			tags: tag,
			event_details: {
				start_date: startDate,
				end_date: endDate,
				start_time: startTime,
				end_time: endTime,
				location: location,
				address: address,
				guest_quantity: ev.event_details.guest_quantity,
				available_seats: availableSeats,
			},
			speakers: newEventSpeakers,
		};

		dispatch(addEvent({ ...ev, ...changedEvent }));

		fetch(`${api}/events/${ev.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...ev, ...changedEvent }),
		}).catch((err) => console.warn(err));
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

	const changeEventType = eventHandler(setEventType);

	const changeProfessionType = (e) => {
		setProfession(e.target.value);
	};

	const handleAddPerson = (obj) => {
		let newPerson = {
			type: 'person',
			name: obj.personFirstNameInput,
			lastName: obj.personLastNameInput,
			DoB: obj.personDoBInput,
			profession: profession,
			about: obj.personBioInput,
		};
		fetch(`${api}/persons/`, {
			method: 'POST',
			body: JSON.stringify(newPerson),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((json) => setNewEventSpeakers([...newEventSpeakers, json]))
			.then(() => {
				setAddPerson(false);
				setProfession('');
			});
	};

	// const handleAddCompany = (obj) => {
	// 	let newCompany = {
	// 		type: 'company',
	// 		name: obj.companyNameInput,
	// 		fieldOfActivity: obj.fieldOfActivityInput,
	// 		about: obj.aboutCompanyInput,
	// 	};
	// 	fetch(`${api}/persons`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(newCompany),
	// 		headers: {
	// 			'Content-type': 'application/json',
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((json) => setNewEventSpeakers([...newEventSpeakers, json]))
	// 		.then(() => {
	// 			setAddOrganizator(false);
	// 		});
	// };

	// const changePersonInput = (e) => {
	// 	setPersonInput(e.target.value);
	// };

	// const addSelectedPerson = () => {
	// 	if (personInput) {
	// 		let thisPerson = persons.filter((e) => e.name === personInput);
	// 		setNewEventSpeakers([...newEventSpeakers, thisPerson[0]]);
	// 	} else {
	// 		alert('Please choose one option');
	// 	}
	// };

	// const changeCompanyInput = (e) => {
	// 	setCompanyInput(e.target.value);
	// };

	// const addChosenCompany = () => {
	// 	if (companyInput) {
	// 		let thisCompany = companys.filter((e) => e.name === companyInput);
	// 		setNewEventSpeakers([...newEventSpeakers, thisCompany[0]]);
	// 	} else {
	// 		alert('Please choose one option');
	// 	}
	// };

	return (
		<div className={'edit-popup'}>
			<div className={'new-event-conteiner'}>
				<fieldset className={'event-title'}>
					<div className='event-title-type'>
						<input
							className='new-event-title-inputs'
							value={title}
							onChange={titleHandler}
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
						value={desc}
						onChange={descHandler}
						placeholder={'Event text'}
						required={true}
					/>
				</fieldset>

				<div className='tag-stroke'>
					<div>
						{tag?.map((item) => (
							<span key={item.id} className='tag-item'>
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
						value={startDate}
						onChange={startDateHandler}
						type={'date'}
					/>
					<input
						className='new-event-inputs'
						value={endDate}
						onChange={endDateHandler}
						type={'date'}
					/>
					<input
						className='new-event-inputs'
						value={startTime}
						onChange={startTimeHandler}
						type={'time'}
					/>
					<input
						className='new-event-inputs'
						value={endTime}
						onChange={endTimeHandler}
						type={'time'}
					/>
				</div>
				<div className='new-event-stroks'>
					<input
						className='new-event-inputs'
						type='number'
						min={0}
						value={price}
						onChange={priceHandler}
						placeholder={"ticket's price"}
					/>
					<input
						className='new-event-inputs'
						min={0}
						value={availableSeats}
						onChange={availableSeatsHandler}
						type={'number'}
						placeholder={'avavilable tickets'}
					/>
				</div>
				<div className='new-event-stroks'>
					<input
						className='new-event-inputs'
						value={location}
						onChange={locationHandler}
						placeholder={'Location'}
					/>
					<input
						className='new-event-inputs'
						value={address}
						onChange={addressHandler}
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
							Upload
						</button>
					</label>
					<img className={'image-preview'} src={image} alt={'image'} />
				</div>

				{addPerson ? (
					<AddPerson
						profession={profession}
						changeProfessionType={changeProfessionType}
						professionTypes={professionTypes}
						handleAddPerson={(obj) => handleAddPerson(obj)}
					/>
				) : (
					''
				)}

				<button className={'button'} type={'submit'} onClick={submitHandler}>
					Save event
				</button>
			</div>
		</div>
	);
};

export default EditEventPopup;
