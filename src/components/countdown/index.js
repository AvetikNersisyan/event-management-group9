import './index.css';
import { FaCalendar } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const Countdown = () => {
    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    const events = useSelector(({ EventDuck }) => EventDuck.events);

    console.log(events);

    let interval = useRef();
    const startTimer = () => {
        const countdownDate = events.map((items) =>
            new Date(items.event_details.start_date).getTime()
        );
        /*  const countdownDate = new Date('February 26, 2022 00:00:00').getTime(); */
        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    };
    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        };
    });

    return (
        <>
            <div className='timer_container'>
                <section className='timer'>
                    <span className='calendar_clock'>
                        <FaCalendar />
                    </span>
                    <h4>Time Left for the Event</h4>
                    <div>
                        <section>
                            <p>{timerDays}</p>
                            <p>
                                <small>Days</small>
                            </p>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{timerHours}</p>
                            <p>
                                <small>Hours</small>
                            </p>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{timerMinutes}</p>
                            <p>
                                <small>Minutes</small>
                            </p>
                        </section>
                        <span>:</span>
                        <section>
                            <p>{timerSeconds}</p>
                            <p>
                                <small>Seconds</small>
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Countdown;
