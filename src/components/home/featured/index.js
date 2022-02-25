import { useNavigate } from 'react-router-dom';
import EventCard from '../../eventCard';
import './index.css';

const Featured = ({ events }) => {
  const navigate = useNavigate();

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  const filteredEvents = events.sort(
    (a, b) =>
      new Date(a.event_details.start_date) -
      new Date(b.event_details.start_date)
  ).filter(
    (items) =>
      new Date(items.event_details.start_date).getTime() >
      new Date().getTime()
  ).slice(0, 4)

  return (
    <>
      <section className='featured'>
        <div>
          <h2 className='section_title'>Featured events</h2>
        </div>
        <div className='profile-event-list'>
          {filteredEvents.map((item) => (
            <EventCard
              key={item.id}
              item={item}
              handleEventClick={(id) => handleEventClick(id)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Featured;
