import { useNavigate } from 'react-router-dom';

import hash from '../../../../assets/img/hash.png';
import locationCard from '../../../../assets/img/locationCard.png';

import './profileEvent.css';

const ProfileEvent = ({
	event: { id, img_url, title, description, tags, event_details },
}) => {
	const navigate = useNavigate();

	const handleEventClick = (id) => {
		navigate(`/events/${id}`);
	};

	return (
		<div className='profile-event-card' onClick={() => handleEventClick(id)}>
			<div className='profile-card-content'>
				<img className='profile-event-img' src={img_url} />
				<div className='profile-about-event'>
					<h2>{title}</h2>
					<p>{description}</p>
				</div>
			</div>
			<div className='event-card-footer'>
				<div>
					<img width={15} src={hash} />
					{tags.map((tag) => (
						<span key={tag} className='event-tags'>
							<span className='event-footer-info'>{tag}</span>
						</span>
					))}
				</div>

				<div>
					<img width={17} src={locationCard} />
					<span className='event-footer-info'>{event_details.location}</span>
				</div>
				<div>
					<span className='event-footer-info'>Date :</span>
					<span className='event-footer-info'>{event_details.start_date}</span>
				</div>
			</div>
		</div>
	);
};

export default ProfileEvent;
