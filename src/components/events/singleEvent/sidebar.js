const Sidebar = ({event_details}) => {
    console.log(event_details);
    return (
        <div className={"sidebar"}>
            <div className={"event-details"}>
                <p> Start date: {event_details.start_date} {event_details.start_time}</p>
                <p> End date: {event_details.end_date} {event_details.end_time}</p>
                <p> Location: {event_details.location}</p>
                <p> Address: {event_details.address}</p>
            </div>
        </div>
    );
};

export default Sidebar;