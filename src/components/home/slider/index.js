import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { sliderCount } from '../../../helper/constants';
import './style.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import Countdown from '../../countdown';

const Slider = ({ events }) => {
	const filteredEvents = events.filter(
		(items) =>
			new Date(items.event_details.start_date).getTime() > new Date().getTime()
	);
	const latestEvents =
		filteredEvents.length >= sliderCount.QUANTITY
			? filteredEvents.slice(filteredEvents.length - sliderCount.QUANTITY)
			: filteredEvents;

	const [currentEvent, setCurrentEvent] = useState(0);

	const sliderLength =
		sliderCount.QUANTITY > latestEvents.length
			? latestEvents.length
			: sliderCount.QUANTITY;

	const nextClickHandler = () => {
		if (currentEvent !== sliderLength - 1) {
			setCurrentEvent((prev) => prev + 1);
		} else setCurrentEvent(0);
	};

	const prevClickHandler = () => {
		if (currentEvent !== 0) {
			setCurrentEvent((prev) => prev - 1);
		} else {
			setCurrentEvent(sliderLength - 1);
		}
	};

	useEffect(() => {
		let id = setTimeout(() => {
			nextClickHandler();
		}, 5000);

		return () => clearTimeout(id);
	});

	return (
		<>
			<div className={'slider-wrapper'}>
				<FaArrowAltCircleLeft
					onClick={prevClickHandler}
					className={'left-arrow'}
				/>
				{latestEvents.map(({ img_url }, idx) => {
					return (
						<div
							className={idx === currentEvent ? 'slide active' : 'slide'}
							key={idx}
						>
							{idx === currentEvent && (
								<img src={img_url} className={'slide-img'} />
							)}
						</div>
					);
				})}
				<FaArrowAltCircleRight
					onClick={nextClickHandler}
					className={'right-arrow'}
				/>
			</div>
			<Countdown latestEvents={latestEvents} currentEvent={currentEvent} />
		</>
	);
};

export default Slider;
