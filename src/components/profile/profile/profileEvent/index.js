import { useNavigate } from 'react-router-dom';
import './profileEvent.css'

const ProfileEvent = ({ event: { id, img_url, title, description } }) => {
    const navigate = useNavigate();

    const handleEventClick = (id) => {
        navigate(`/events/${id}`);
    };

    return (
        <div className="profile-event-card" onClick={() => handleEventClick(id)}>
            <div className='profile-card-content'>
                <img className="profile-event-img" src={img_url} />
                <div className='profile-about-event'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileEvent;