import { useNavigate } from 'react-router-dom';
import './profileEvent.css'

const ProfileEvent = ({ event: { id, img_url, title, description } }) => {
    const navigate = useNavigate();

    const handleEventClick = (id) => {
        navigate(`/events/${id}`);
    };

    return (
        <div className="event" onClick={() => handleEventClick(id)}>
            <img className="eventImg" src={img_url} />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default ProfileEvent;