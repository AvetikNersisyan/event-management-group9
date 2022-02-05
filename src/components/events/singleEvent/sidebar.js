const Sidebar = ({start_date, start_time, end_date, end_time, location, address}) => {
    console.log(start_time);
    return (
        <div className={"sidebar"}>
            <div className={"event-details"}>
                <h3> Event detail</h3>
                <div className={"event-detail-info"}>
                    <label> Start date: </label>
                    <span> {start_date} {start_time}</span>
                </div>
                <div className={"event-detail-info"}>
                    <label> End date: </label>
                    <span> {end_date} {end_time}</span>
                </div>

                <div className={"event-detail-info"}>
                    <label> Location: </label>
                    <span> {location} </span>
                </div>

                <div className={"event-detail-info"}>
                    <label> Address: </label>
                    <span> {address} </span>
                </div>


            </div>
        </div>
    );
};

export default Sidebar;