import {useSelector} from "react-redux";
import EventCard from "./eventCard";
import "./index.css";
import {useParams} from "react-router-dom";

const SingleEvent = () => {
    const events = useSelector(({EventDuck}) => EventDuck.events);
    const path = useParams();
    console.log(events);

    return (
        <>
            {<EventCard {...events[path.eventId - 1]} />}
        </>
    );
};

export default SingleEvent;