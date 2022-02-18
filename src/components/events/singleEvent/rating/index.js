import { memo, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	setActiveUser,
	setRatedEvents,
} from '../../../../redux/ducks/userDuck';

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

	console.log(isAlreadyRated, 'is Already rated');

	console.log(activeUser, 'active');

	const [rating, setRating] = useState(sum / count || 0);
	const [currentValue, setCurrentValue] = useState(sum / count || 0);
	const [hoverValue, setHoverValue] = useState(undefined);
	const [isRated, setIsRated] = useState(isAlreadyRated);

	const dispatch = useDispatch();

	console.log(currentValue);

	const stars = Array(5).fill(0);

	const handleSubmit = (e) => {
		e.preventDefault();
	};
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
				{
					!isRated && (
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
					)
					// <form className='...forms' action='' onSubmit={handleSubmit}>
					//
					// </form>
				}
			</div>
		</div>
	);
};

export default Rating;
