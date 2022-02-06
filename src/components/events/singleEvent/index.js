import {useSelector} from "react-redux";
import EventCard from "./eventCard";
import './index.css';
import {useParams} from "react-router-dom";
import Sidebar from "./sidebar";


const backGroundImage = "https://ovatheme.com/em4u/wp-content/themes/em4u/assets/img/bg_heading-compressor.jpg";

const SingleEvent = () => {

    const events = useSelector(({EventDuck}) => EventDuck.events);


    const path = useParams();
    const event = events[path.eventId - 1];

    console.log(events);

    return (
        <div className={"single-event-page"}>

            <div className={"bg"}>

            </div>

            <img className={"bgImage"} src={backGroundImage}/>


            <EventCard {...event} />
            <Sidebar {...event["event_details"]}/>

        </div>
    );
};

export default SingleEvent;