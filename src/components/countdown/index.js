import { useEffect, useState } from 'react';

import { FaCalendar } from 'react-icons/fa';

import './index.css';

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
			+new Date(`${latestEvents[currentEvent].event_details.start_date}T${latestEvents[currentEvent].event_details.start_time}:00`) -
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
					<h4>Time Left for this Event</h4>
					<div>
						<section>
							<p>{timeLeft?.days}</p>
							<p>
								<small>Days</small>
							</p>
						</section>
						<span>:</span>
						<section>
							<p>{timeLeft?.hours < 10 ? '0' + timeLeft?.hours : timeLeft?.hours}</p>
							<p>
								<small>Hours</small>
							</p>
						</section>
						<span>:</span>
						<section>
							<p>{timeLeft?.minutes < 10 ? '0' + timeLeft?.minutes : timeLeft?.minutes}</p>
							<p>
								<small>Minutes</small>
							</p>
						</section>
						<span>:</span>
						<section>
							<p>{timeLeft?.seconds < 10 ? '0' + timeLeft?.seconds : timeLeft?.seconds}</p>
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
