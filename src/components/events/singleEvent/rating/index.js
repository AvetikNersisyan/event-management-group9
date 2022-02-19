import { memo, useEffect, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	setActiveUser,
	setRatedEvents,
} from '../../../../redux/ducks/userDuck';
import { api } from '../../../../api';

const colors = {
	orange: '#471d1b',
	grey: '#a9a9a9',
};

const Rating = ({ ev }) => {
	const { count, sum } = ev.rate;

	const activeUser = useSelector(({ UserDuck }) => UserDuck.activeUser);
	const isAlreadyRated = useMemo(
		() => activeUser?.rated_events?.some((id) => id === ev.id),
		[activeUser?.rated_events?.length]
	);

	const [rating, setRating] = useState(sum / count || 0);
	const [currentValue, setCurrentValue] = useState(sum / count || 0);
	const [hoverValue, setHoverValue] = useState(undefined);
	const [isRated, setIsRated] = useState(isAlreadyRated);

	useEffect(() => {
		setRating((sum + currentValue) / (count + 1));
	}, [currentValue]);
	const dispatch = useDispatch();

	const stars = Array(5).fill(0);

	useEffect(() => {
		fetch(`${api}/users/${activeUser?.id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ rated_events: activeUser?.rated_events }),
		}).catch((err) => console.warn(err));

		fetch(`${api}/events/${ev.id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				rate: { sum: sum + currentValue, count: count + 1 },
			}),
		});
	}, [currentValue]);

	const handleClick = (value) => {
		setCurrentValue(value);
		const changedActiveUser = {
			...activeUser,
		};
		changedActiveUser.rated_events
			? changedActiveUser.rated_events.push(ev.id)
			: (changedActiveUser.rated_events = [ev.id]);
		dispatch(setActiveUser(changedActiveUser));

		dispatch(setRatedEvents({ userId: activeUser?.id, eventId: ev.id }));
		setIsRated(true);
	};

	const handleMouseOver = (newHoverValue) => {
		setHoverValue(newHoverValue);
	};

	const handleMouseLeave = () => {
		setHoverValue(undefined);
	};
	return (
		<div>
			<div className='box'>
				{!isRated && activeUser && (
					<div className='stars'>
						{stars.map((_, index) => {
							return (
								<FaStar
									key={index}
									onClick={() => handleClick(index + 1)}
									onMouseOver={() => handleMouseOver(index + 1)}
									onMouseLeave={handleMouseLeave}
									color={
										(hoverValue || currentValue) > index
											? colors.orange
											: colors.grey
									}
								/>
							);
						})}
					</div>
				)}
			</div>
			<p> {rating}/5</p>
		</div>
	);
};

export default Rating;
