import { NavLink, useNavigate } from 'react-router-dom';
import fbIcon from '../../../assets/img/facebook-app-symbol.png';
import twitterIcon from '../../../assets/img/twitter.png';
import shareIcon from '../../../assets/img/share.png';
import favoriteIcon from '../../../assets/img/favourite.png';
import deleteIcon from '../../../assets/img/delete.png';
import EventFooter from './eventFooter';
import { api } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent } from '../../../redux/ducks/eventDuck';
import { setLikedEvent } from '../../../redux/ducks/userDuck';
import { useEffect, useState } from 'react';

const EventCard = ({ ev, title, description, img_url, tags, id }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const activeUser = useSelector(({ UserDuck }) => UserDuck.activeUser); //TODO: get active user to show delete button

	const [favBtnId, setFavBtnId] = useState('');

	const likeEvenetHandler = () => {
		if (!activeUser) {
			navigate('/profile');
		} else {
			dispatch(setLikedEvent({ activeUser, ev }));
			setFavBtnId('likedBtn');
		}
	};

	useEffect(() => {
		if (activeUser && activeUser.interestedEvents.some((evId) => evId === id)) {
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

	return (
		<div className={'event-vertical'}>
			<div className={'event-card'}>
				<div className={'event-head'}>
					<h1>{title}</h1>
					<span className={'user-options'}>
						<img
							onClick={() => deleteHandler(id)}
							id={'deleteBtn'}
							src={deleteIcon}
							alt={'delete'}
						/>
						<img
							onClick={() => likeEvenetHandler()}
							id={`${favBtnId}`}
							src={favoriteIcon}
							alt={'favorite'}
						/>
					</span>
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

			<EventFooter />
		</div>
	);
};

export default EventCard;
