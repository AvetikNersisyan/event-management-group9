// import { useRef, useState } from 'react';
// import './style.css';
// import NewEvent from '../../newEvent';
// import { eventTypes } from '../../../../helper/constants';
//
// const EditEventPopup = ({ ev }) => {
// 	const [title, newTitle] = useState(ev.title || '');
// 	const [desc, newDesc] = useState(ev.description || '');
// 	const [image, newImage] = useState(ev.img_url || '');
// 	const [type, newType] = useState(ev.type || '');
// 	const [tag, setTag] = useState(ev.tags);
//
// 	const newTitleHandler = (e) => newTitle(e.target.value);
//
// 	const descHandler = (e) => newDesc(e.target.value);
//
// 	const handleEventType = (e) => newType(e.target.value);
//
// 	const removeTag = (e) => {
// 		let id = e.item;
// 		const newInt = tag.filter((item) => item !== id);
// 		setTag(newInt);
// 	};
//
// 	const addTag = () => {
// 		let newTag = tagElement.current.value;
// 		if (newTag === '') {
// 			alert('Please type some tag');
// 		} else {
// 			setTag([...tag, newTag]);
// 			tagElement.current.value = '';
// 		}
// 	};
//
// 	return (
// 		<div className={'edit-popup'}>
// 			{/*<NewEvent ev={ev} />*/}
// 			<input value={title} onChange={newTitleHandler} />
// 			<textarea value={desc} onChange={descHandler} />
// 			<select
// 				// className='new-event-title-inputs'
// 				value={type}
// 				onChange={handleEventType}
// 			>
// 				{eventTypes.map((type) => (
// 					<option key={type} value={type}>
// 						{type}
// 					</option>
// 				))}
// 			</select>
//
// 			<div>
// 				{tag?.map((item) => (
// 					<span className='tag-item'>
// 						<span>{item}</span>
// 						<button
// 							className='remove-button'
// 							onClick={() => removeTag({ item })}
// 						>
// 							X
// 						</button>
// 					</span>
// 				))}
// 			</div>
//
// 			<div className='tag-input'>
// 				<input
// 					className='new-event-inputs'
// 					type='search'
// 					ref={tagElement}
// 					placeholder='tags..'
// 				/>
// 				<button className='button' onClick={addTag}>
// 					Add
// 				</button>
// 			</div>
//
// 			<div className={'new-event-stroks'}>
// 				<input className='new-event-inputs' ref={startDate} type={'date'} />
// 				<input className='new-event-inputs' ref={endDate} type={'date'} />
// 				<input className='new-event-inputs' ref={startTime} type={'time'} />
// 				<input className='new-event-inputs' ref={endTime} type={'time'} />
// 			</div>
// 			<div className='new-event-stroks'>
// 				<input
// 					className='new-event-inputs'
// 					type='number'
// 					ref={priceInput}
// 					placeholder={"ticket's price"}
// 				/>
// 				<input
// 					className='new-event-inputs'
// 					min={0}
// 					ref={ticketCountInput}
// 					type={'number'}
// 					placeholder={'avavilable tickets'}
// 				/>
// 			</div>
// 		</div>
// 	);
// };
//
// export default EditEventPopup;

import './style.css';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../../../../api';
import { useNavigate } from 'react-router-dom';
import { eventHandler, toBase64 } from '../../../../helper/utils';
import { addEvent } from '../../../../redux/ducks/eventDuck';
import { eventTypes, professionTypes } from '../../../../helper/constants';
import AddPerson from '../../newEvent/addPerson';
import AddCompany from '../../newEvent/addCompany';

const EditEventPopup = ({ ev }) => {
	const tagElement = useRef(null);
	const navigate = useNavigate();

	const data = useSelector((state) => state.PersonsDuck.persons);
	const [persons, setPersons] = useState(
		data.filter((item) => item.type === 'person')
	);
	const [companys, setCompanys] = useState(
		data.filter((item) => item.type === 'company')
	);
	const [personInput, setPersonInput] = useState('');
	const [companyInput, setCompanyInput] = useState('');

	const [eventType, setEventType] = useState(ev.type || '');

	const [title, newTitle] = useState(ev.title);
	const [desc, newDesc] = useState(ev.description);
	const [startDate, newStartDate] = useState(ev.event_details.start_date);
	const [endDate, newEndDate] = useState(ev.event_details.end_date);
	const [endTime, newEndTime] = useState(ev.event_details.end_time);
	const [startTime, newStartTime] = useState(ev.event_details.end_time);

	const endDateHandler = eventHandler(newEndDate);
	const startDateHandler = eventHandler(newStartDate);
	const endTimeHandler = eventHandler(newEndTime);
	const startTimeHandler = eventHandler(newStartTime);

	const [tag, setTag] = useState([]);
	// const startDate = useRef(null);
	// const startTime = useRef(null);
	// const endDate = useRef(null);
	// const endTime = useState(null);

	// const locationInput = useRef(null);
	// const addressInput = useRef(null);
	// const ticketCountInput = useRef(null);
	// const priceInput = useRef(null);
	const [image, setImage] = useState('');
	const [newEventSpeakers, setNewEventSpeakers] = useState([]);

	const [addPerson, setAddPerson] = useState(false);
	const [profession, setProfession] = useState('');

	const [addOrganizator, setAddOrganizator] = useState(false);

	const dispatch = useDispatch();

	const imageRef = useRef(null);
	// const tagElement = useRef(null);

	const descHandler = eventHandler(newDesc);
	const titleHandler = eventHandler(newTitle);

	console.log(title);
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
		let newEvent = {
			// type: eventType,
			// title: title,
			// description: textInput.current.value,
			// price: priceInput.current.value,
			// img_url: image,
			// tags: tag,
			// event_details: {
			// 	start_date: startDate.current.value,
			// 	end_date: endDate.current.value,
			// 	start_time: startTime.current.value,
			// 	end_time: endTime.current.value,
			// 	location: locationInput.current.value,
			// 	address: addressInput.current.value,
			// 	guest_quantity: ticketCountInput.current.value,
			// 	available_seats: ticketCountInput.current.value,
			// },
			// speakers: newEventSpeakers,
			// rate: {
			// 	count: 0,
			// 	sum: 0,
			// },
		};

		fetch(`${api}/events/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newEvent),
		})
			.then((res) => res.json())
			.then((res) => {
				dispatch(addEvent(newEvent));
			})
			.then(navigate('/events'))
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

	const handleAddCompany = (obj) => {
		let newCompany = {
			type: 'company',
			name: obj.companyNameInput,
			fieldOfActivity: obj.fieldOfActivityInput,
			about: obj.aboutCompanyInput,
		};
		fetch(`${api}/persons`, {
			method: 'POST',
			body: JSON.stringify(newCompany),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((json) => setNewEventSpeakers([...newEventSpeakers, json]))
			.then(() => {
				setAddOrganizator(false);
			});
	};

	const changePersonInput = (e) => {
		setPersonInput(e.target.value);
	};

	const addChoosenPerson = () => {
		if (personInput) {
			let thisPerson = persons.filter((e) => e.name === personInput);
			setNewEventSpeakers([...newEventSpeakers, thisPerson[0]]);
		} else {
			alert('Please choose one option');
		}
	};

	const changeCompanyInput = (e) => {
		setCompanyInput(e.target.value);
	};

	const addChosenCompany = () => {
		if (companyInput) {
			let thisCompany = companys.filter((e) => e.name === companyInput);
			setNewEventSpeakers([...newEventSpeakers, thisCompany[0]]);
		} else {
			alert('Please choose one option');
		}
	};

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
						// ref={priceInput}
						placeholder={"ticket's price"}
					/>
					<input
						className='new-event-inputs'
						min={0}
						// ref={ticketCountInput}
						type={'number'}
						placeholder={'avavilable tickets'}
					/>
				</div>
				<div className='new-event-stroks'>
					<input
						className='new-event-inputs'
						// ref={locationInput}
						placeholder={'Location'}
					/>
					<input
						className='new-event-inputs'
						// ref={addressInput}
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
					<img style={{ width: '100%' }} src={image} alt={'image'} />
				</div>

				<div className='new-event-stroks'>
					<div>
						<select
							className='new-event-selector'
							value={personInput}
							onChange={changePersonInput}
						>
							{persons.map((person) => (
								<option key={person.id} value={person.name}>
									{person.name + ' ' + person.lastName}
								</option>
							))}
						</select>
						<button className='button' onClick={addChoosenPerson}>
							Add
						</button>
					</div>
					<button className='button' onClick={() => setAddPerson(!addPerson)}>
						{addPerson ? 'Close adding' : 'Add New Person'}
					</button>
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

				<div className='new-event-stroks'>
					<div>
						<select
							className='new-event-selector'
							value={companyInput}
							onChange={changeCompanyInput}
						>
							{companys.map((person) => (
								<option key={person.id} value={person.name}>
									{person.name}
								</option>
							))}
						</select>
						<button className='button' onClick={addChosenCompany}>
							Add
						</button>
					</div>
					<button
						className='button'
						onClick={() => setAddOrganizator(!addOrganizator)}
					>
						{addOrganizator ? 'Close adding' : 'Add New Organizator'}
					</button>
				</div>
				{addOrganizator ? (
					<AddCompany handleAddCompany={(obj) => handleAddCompany(obj)} />
				) : (
					''
				)}

				<div>
					{newEventSpeakers?.map((item, index) => (
						<span className='tag-item' key={index}>
							<span>{item.name}</span>
							<button
								className='remove-button'
								// onClick={() => removeSpeaker(item.name)}
							>
								X
							</button>
						</span>
					))}
				</div>
				<button className={'button'} type={'submit'} onClick={submitHandler}>
					Add event
				</button>
			</div>
		</div>
	);
};

export default EditEventPopup;
