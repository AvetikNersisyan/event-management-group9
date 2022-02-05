import {NavLink} from "react-router-dom";
import fbIcon from "../../../assets/img/facebook-app-symbol.png";
import twitterIcon from "../../../assets/img/twitter.png";
import shareIcon from "../../../assets/img/share.png";
import EventFooter from "./eventFooter";


const EventCard = ({title, description, img_url, tags}) => {


    return (
        <div className={"event-vertical"}>

            <div className={"event-card"}>
                <div className={"event-head"}>

                    <h1>
                        {title}
                    </h1>
                    <span>

                </span>
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

                        <img src={shareIcon}/>
                        <p> Share </p>


                        <div id={"fbIcon"}></div>
                        <div id={"twitterIcon"}></div>
                        {/*<img src={twitterIcon}/>*/}
                    </div>
                </div>

            </div>


            <EventFooter/>
        </div>
    );
};

export default EventCard;