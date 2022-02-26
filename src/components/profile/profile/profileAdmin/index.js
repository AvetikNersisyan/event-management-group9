import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setMessageRead,
	setMessageUnread,
} from '../../../../redux/ducks/userDuck';
import { api } from '../../../../api';

const ProfileAdmin = ({ activeUser }) => {
	const [messages, setMessages] = useState(activeUser.messages);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleNavigateId = (msgId) => {
		navigate(`/events/${msgId}`);
	};

	const handleMarkAsRead = (messageId) => {
		dispatch(setMessageRead(messageId));
		const changedMessages = activeUser.messages.map((item) => {
			if (item.id === messageId) {
				item.status = true;
			} else {
				console.log(item.status);
			}
			return item;
		});

		setMessages(changedMessages);
		fetch(`${api}/users/100/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messages: [...changedMessages],
			}),
		}).then((res) => res.json());
	};

	const handleMarkAsUnread = (messageId) => {
		dispatch(setMessageUnread(messageId));
		const changedMessages = activeUser.messages.map((item) => {
			if (item.id === messageId) {
				item.status = false;
			} else {
				console.log(item.status);
			}
			return item;
		});
		setMessages(changedMessages);
		fetch(`${api}/users/100/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messages: [...changedMessages],
			}),
		}).then((res) => res.json());
	};

	return (
		<>
			<h1 className='detaile-classes'>Hello our admin</h1>
			<h2 className='detaile-classes'>Messages</h2>
			<div className='card-footer-all-comments'>
				{messages
					.sort((a, b) => new Date(b.id) - new Date(a.id))
					.map((msg, id) => (
						<div key={id}>
							<div
								className='admin-single-comment'
								style={
									!msg.status
										? { backgroundColor: 'rgb(255, 146, 146)' }
										: { backgroundColor: 'rgb(123, 255, 123)' }
								}
							>
								<div className='admin-sender-info'>
									<div className='admin-message-details'>{msg.sender}</div>
									<div className='admin-message-details'>{msg.email}</div>
								</div>
								<div className='admin-sender-info'>
									<div className='admin-message-details'>{msg.subject}</div>
									<div
										className='admin-message-details event-id-link'
										onClick={() => handleNavigateId(msg.eventId)}
									>
										id: {msg.eventId}
									</div>
								</div>
								<div className='admin-message-details'>{msg.message}</div>
								{!msg.status ? (
									<button
										className='button'
										onClick={() => handleMarkAsRead(msg.id)}
									>
										Mark as read
									</button>
								) : (
									<button
										className='button'
										onClick={() => handleMarkAsUnread(msg.id)}
									>
										Unmark
									</button>
								)}
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default ProfileAdmin;
