import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser, setLoggedIn } from '../../../redux/ducks/userDuck';
import AvatarURL from '../../../assets/img/avatar.png';

const ProfileInfo = () => {
	const activeUser = useSelector((state) => state.UserDuck.activeUser)
	const dispatch = useDispatch();

	const handleLogOut = () => {
		dispatch(setLoggedIn(false))
		dispatch(setActiveUser(null));
	};
	return (
		<div className='myProfile'>
			<div className='profilePhoto'>
				<img className='photo' src={AvatarURL} alt={'#'} />
			</div>
			<div className='about'>
				<p>
					{activeUser.firstname} {activeUser.lastname}
				</p>
				<div className='interests'>
					<p className='interests'>Interestes</p>
					<div className='interestsItems'>
						{activeUser.interests?.map((e) => (
							<span className='interestsItem'>{e}</span>
						))}
					</div>
				</div>
			</div>
			<div className='events'>
				<p>Interested</p>
				{activeUser.interestedEvents?.map((e) => (
					<div className='event'>{e}</div>
				))}
			</div>
			<div className='going'>
				<p>Going</p>
				{activeUser.going?.map((e) => (
					<div className='event'>{e}</div>
				))}
			</div>
			<div className='going'>
				<p>Allready gone</p>
				{activeUser.allreadyGone?.map((e) => (
					<div className='event'>{e}</div>
				))}
			</div>
			<button onClick={handleLogOut}>LogOut</button>
		</div>
	);
};
export default ProfileInfo;
