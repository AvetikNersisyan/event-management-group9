import {useSelector} from "react-redux";
import EventCard from "./eventCard";
import "./index.css";
import {useParams} from "react-router-dom";
import Sidebar from "./sidebar";

const SingleEvent = () => {

    const events = useSelector(({EventDuck}) => EventDuck.events);
    const path = useParams();
    const event = events[path.eventId - 1];

    console.log(event, "events");

    return (
        <div className={"single-event-page"}>
            <EventCard {...event} />
            <Sidebar {...event.event_details}/>
        </div>
    );
};

export default SingleEvent;