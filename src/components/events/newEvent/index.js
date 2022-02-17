import './index.css';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../api';
import { addEvent } from '../../../redux/ducks/eventDuck';
import { toBase64 } from '../../../helper/utils';
import { eventTypes, professionTypes } from '../../../helper/constants';
import AddCompany from './addCompany';
import AddPerson from './addPerson';
import { useNavigate } from 'react-router-dom';

const NewEvent = () => {
	const navigate = useNavigate();

	const data = useSelector((state) => state.PersonsDuck.persons);
	const [persons, setPersons] = useState(data.filter(item => item.type === "person"))
	const [companys, setCompanys] = useState(data.filter(item => item.type === "company"))
	const [personInput, setPersonInput] = useState('');
	const [companyInput, setCompanyInput] = useState('');

	const [eventType, setEventType] = useState('');
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [tag, setTag] = useState([]);
	const [startDate, setStartDate] = useState('');
	const [startTime, setStartTime] = useState('')
	const [endDate, setEndDate] = useState('');
	const [endTime, setEndTime] = useState('');


	const [location, setLocation] = useState('');
	const [address, setAddress] = useState('');
	const [ticketCount, setTicketCount] = useState(null);
	const [price, setPrice] = useState(null)
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

	const inputFile = () => {
		imageRef.current.click();
	};

	const submitHandler = (e) => {
		e.preventDefault();
		let newEvent = {
			type: eventType,
			title: title,
			description: text,
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
				guest_quantity: ticketCount,
				available_seats: ticketCount,
			},
			speakers: newEventSpeakers,
			rate: {
				coutn: 0,
				sum: 0
			}
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


	const changeEventType = (e) => {
		setEventType(e.target.value);
	};

	const changeProfessionType = (e) => {
		setProfession(e.target.value);
	};

	const handleAddPerson = () => {
		let newPerson = {
			type: 'person',
			name: personFirstName,
			lastName: personLastName,
			DoB: personDoB,
			profession: profession,
			about: personBio,
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
				setPersonFirstName('');
				setPersonLastName('');
				setPersonDoB('');
				setPersonBio('');
				setProfession('');
			});
	};

	const handleAddCompany = () => {
		let newCompany = {
			type: 'company',
			name: companyName,
			fieldOfActivity: fieldOfActivity,
			about: aboutCompany,
		};
		console.log(newCompany);
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
				setCompanyName('');
				setFieldOfActivity('');
				setAboutCompany('');
			});
	};

	const changePersonInput = (e) => {
		setPersonInput(e.target.value);
	};
	const addChoosenPerson = () => {
		if (personInput) {
			let thisPerson = persons.filter(e => e.name === personInput)
			setNewEventSpeakers([...newEventSpeakers, thisPerson[0]]);
		} else {
			alert('Please choose one option')
		}
	}

	const changeCompanyInput = (e) => {
		setCompanyInput(e.target.value);
	};
	const addChoosenCompany = () => {
		if (companyInput) {
			let thisCompany = companys.filter(e => e.name === companyInput)
			setNewEventSpeakers([...newEventSpeakers, thisCompany[0]]);
		} else {
			alert('Please choose one option')
		}
	}


	return (
		<div className={'new-event-page global-conteiner'}>
			<div className={'new-event-conteiner'}>
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
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						type={'date'}
					/>
					<input
						className='new-event-inputs'
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						type={'date'}
					/>
					<input
						className='new-event-inputs'
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						type={'time'}
					/>
					<input
						className='new-event-inputs'
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						type={'time'}
					/>
				</div>
				<div className='new-event-stroks'>
					<input
						className='new-event-inputs'
						type='number'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder={"ticket's price"}
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
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						placeholder={'Location'}
					/>
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
					<img style={{ width: '100%' }} src={image} />
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
						personFirstName={personFirstName}
						setPersonFirstName={setPersonFirstName}
						personLastName={personLastName}
						setPersonLastName={setPersonLastName}
						personDoB={personDoB}
						setPersonDoB={setPersonDoB}
						personBio={personBio}
						setPersonBio={setPersonBio}
						handleAddPerson={handleAddPerson}
					/>
				) :
					''
				}


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
						<button className='button' onClick={addChoosenCompany}>
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
				{addOrganizator ?
					<AddCompany
						companyName={companyName}
						setCompanyName={setCompanyName}
						fieldOfActivity={fieldOfActivity}
						setFieldOfActivity={setFieldOfActivity}
						aboutCompany={aboutCompany}
						setAboutCompany={setAboutCompany}
						handleAddCompany={handleAddCompany}
					/>
					:
					''
				}


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

export default NewEvent;
