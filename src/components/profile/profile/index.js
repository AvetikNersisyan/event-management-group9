import React from 'react';
const ProfileInfo = ({ activeUser, setActiveUser }) => {
    const handleLogOut = () => {
        setActiveUser(null);
    };
    return (
        <div className='myProfile'>
            <div className='profilePhoto'>
                <img className='photo' src='/img/avatar.png' alt={'#'} />
            </div>
            <div className='about'>
                <p>
                    {activeUser.firstname} {activeUser.lastname}
                </p>
                <div className='interests'>
                    <p className='interests'>Interestes</p>
                    <div className='interestsItems'>
                        {activeUser.interests.map((e) => (
                            <span className='interestsItem'>{e}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className='events'>
                <p>Interested</p>
                {activeUser.interestedEvents.map((e) => (
                    <div className='event'>{e}</div>
                ))}
            </div>
            <div className='going'>
                <p>Going</p>
                {activeUser.going.map((e) => (
                    <div className='event'>{e}</div>
                ))}
            </div>
            <div className='going'>
                <p>Allready gone</p>
                {activeUser.allreadyGone.map((e) => (
                    <div className='event'>{e}</div>
                ))}
            </div>
            <button onClick={handleLogOut}>LogOut</button>
        </div>
    );
};
export default ProfileInfo;
