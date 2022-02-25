import { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import shareIcon from '../../../assets/img/share.png';
import favoriteIcon from '../../../assets/img/favourite.png';
import deleteIcon from '../../../assets/img/delete.png';
import editIcon from '../../../assets/img/edit.png';

import EventFooter from './eventFooter';
import { api } from '../../../api';

import { deleteEvent } from '../../../redux/ducks/eventDuck';
import {
	removeLike,
	setActiveUser,
	setLikedEvent,
} from '../../../redux/ducks/userDuck';

import EditEventPopup from './editEventPopup';

const EventCard = ({ ev }) => {
	const { title, description, img_url, tags, id } = ev;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const activeUser = useSelector(({ UserDuck }) => UserDuck.activeUser);

	const changedLikedEvents = useMemo(() => {
		return activeUser.interestedEvents.filter(({ id }) => id !== ev.id);
	}, [ev.id]);

	const [isEditing, setIsEditing] = useState(false);
	const [favBtnId, setFavBtnId] = useState('favouriteBtn');

	const isLiked = () => favBtnId === 'likedBtn';

	const dislikeEvent = () => {
		setFavBtnId('favouriteBtn');

		const changedUser = {
			...activeUser,
			interestedEvents: changedLikedEvents,
		};

		fetch(`${api}/users/${activeUser.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(changedUser),
		})
			.then((res) => res.ok && dispatch(removeLike(changedUser)))
			.catch((err) => console.warn(err));
	};

	const isAdminLogged = activeUser && activeUser.type === 'admin';

	const likeEvent = () => {
		if (!activeUser) {
			navigate('/profile');
		} else {
			fetch(`${api}/users/${activeUser.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...activeUser,
					interestedEvents: [...activeUser.interestedEvents, ev],
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					res.ok && dispatch(setLikedEvent({ activeUser, ev }));
					dispatch(
						setActiveUser({
							...activeUser,
							interestedEvents: [...activeUser.interestedEvents, ev],
						})
					);
					console.log(res);
				})
				.catch((err) => console.log(err));
			setFavBtnId('likedBtn');
		}
	};

	const likeEventHandler = () => {
		!isLiked() ? likeEvent() : dislikeEvent();
	};

	useEffect(() => {
		if (
			activeUser &&
			activeUser?.interestedEvents?.some((event) => event.id === id)
		) {
			setFavBtnId('likedBtn');
		}
	}, []);

	const deleteHandler = (id) => {
		fetch(`${api}/events/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then(() => {
				dispatch(deleteEvent(id));
				navigate('/events');
			});
	};

	const editHandler = () => {
		setIsEditing((prev) => !prev);
	};

	return (
		<>
			{isEditing && <EditEventPopup editHandler={editHandler} ev={ev} />}

			<div className={'event-vertical'}>
				<div className={'event-card'}>
					<div className={'event-head'}>
						<h1>{title}</h1>
						<div className={'user-options'}>
							{isAdminLogged ? (
								<>
									<img
										onClick={() => deleteHandler(id)}
										id={'deleteBtn'}
										src={deleteIcon}
										alt={'delete'}
									/>
									<img onClick={editHandler} src={editIcon} />
								</>
							) : (
								<img
									onClick={likeEventHandler}
									id={`${favBtnId}`}
									src={favoriteIcon}
									alt={'favorite'}
								/>
							)}
						</div>
					</div>

					<div className={'gallery'}>
						<img src={img_url} alt={'Event image'} />
					</div>

					<div className={'description'}>{description}</div>

					<hr className={'divider'} />

					<div className={'event-row'}>
						<div className={'event-tags tags'}>
							<p> Tags: </p>{' '}
							{tags?.map((item, idx) => (
								<NavLink to={'/events/'} key={idx}>
									{item}
								</NavLink>
							))}
						</div>

						<div className={'social-share'}>
							<img src={shareIcon} alt={'#'} />
							<p> Share </p>

							<div id={'fbIcon'}></div>
							<div id={'twitterIcon'}></div>
						</div>
					</div>
				</div>

				<EventFooter ev={ev} />
			</div>
		</>
	);
};

export default EventCard;

// this is comment
