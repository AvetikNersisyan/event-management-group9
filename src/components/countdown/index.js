import './index.css';
import { FaCalendar } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Countdown = ({ latestEvents, currentEvent }) => {
	const [timeLeft, setTimeLeft] = useState();

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	});

	const calculateTimeLeft = () => {
		const difference =
			+new Date(latestEvents[currentEvent].event_details.start_date) -
			+new Date();

		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}
		return timeLeft;
	};

	return (
		<>
			<section className='timer_container'>
				<section className='timer'>
					<span className='calendar_clock'>
						<FaCalendar />
					</span>
					<h4>Time Left for the Event</h4>
					<div>
						<section>
							<p>{timeLeft?.days}</p>
							<p>
								<small>Days</small>
							</p>
						</section>
						<span>:</span>
						<section>
							<p>{timeLeft?.hours}</p>
							<p>
								<small>Hours</small>
							</p>
						</section>
						<span>:</span>
						<section>
							<p>{timeLeft?.minutes}</p>
							<p>
								<small>Minutes</small>
							</p>
						</section>
						<span>:</span>
						<section>
							<p>{timeLeft?.seconds}</p>
							<p>
								<small>Seconds</small>
							</p>
						</section>
					</div>
				</section>
			</section>
		</>
	);
};

export default Countdown;
