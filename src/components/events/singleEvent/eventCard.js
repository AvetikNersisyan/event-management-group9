import {NavLink} from "react-router-dom";
import fbIcon from "../../../assets/img/facebook-app-symbol.png"

const EventCard = ({title, description, img_url, tags}) => {


    console.log(tags);
    return (
        <div className={"event-card"}>

            <div>
                <h1>
                    {title}
                </h1>
            </div>

            <div className={"gallery"}>
                <img src={img_url}/>
            </div>


            <div className={"description"}>
                {description}
            </div>


            <hr className={"divider"}/>

            <div className={"event-row"}>
                <div className={"event-tags tags"}>
                    <p> Tags: </p> {tags?.map((item, idx) => <NavLink to={`/events/}`} key={idx}>{item}</NavLink>)}
                </div>

                <div className={"social-share"}>
                    share via <img src={fbIcon}/>
                </div>
            </div>


        </div>
    );
};

export default EventCard;