import React from "react";


const ProfileInfo = ({activeUser}) => {
    return (
        <div className="myProfile">
            <div className="profilePhoto">
                <img className="photo" src="/img/avatar.png" alt={"#"}/>
            </div>
            <div className="about">
                <p>{activeUser.firstname} {activeUser.lastname}</p>
                <div className="interests">
                    <p className="interests">Interestes</p>
                    <div className="interestsItems">
                        <span className="interestsItem">Music</span>
                        <span className="interestsItem">Festivals</span>
                    </div>
                </div>
            </div>
            <div className="events">
                <p>Interested</p>
                <div className="event"></div>
                <div className="event"></div>
            </div>
            <div className="going">
                <p>Going</p>
                <div className="event"></div>
                <div className="event"></div>
            </div>
        </div>
    );
};

export default ProfileInfo;