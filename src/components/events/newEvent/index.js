import './index.css';
import { useState } from 'react';

const NewEvent = () => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [tag, setTag] = useState('');
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');

	const [location, setLocation] = useState('');
	const [address, setAddress] = useState('');
	const [ticketCount, setTicketCount] = useState(0);

	return (
		<div className={'new-event-container'}>
			<form className={'new-event-form'}>
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
					<input type={'file'} />

					<button className={'btn primary'} type={'submit'}>
						Add event
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewEvent;
