import {useSelector} from "react-redux";
import EventCard from "./eventCard";
import "./index.css";
import {useParams} from "react-router-dom";
import Sidebar from "./sidebar";

const SingleEvent = () => {
    // const events = useSelector(({EventDuck}) => EventDuck.events);
    const events = useSelector(({EventDuck}) => EventDuck.events);
    const path = useParams();

    console.log(events, "events");

    return (
        <div className={"single-event-page"}>
            <EventCard {...events[path.eventId - 1]} />
            <Sidebar  {...events[path.eventId - 1]} />
        </div>
    );
};

export default SingleEvent;