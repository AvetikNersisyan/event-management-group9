import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setActiveUser,
	setLoggedIn,
	setProfilePic,
} from '../../../redux/ducks/userDuck';
import { api } from '../../../api';
import ProfileEvent from './profileEvent';
import { NavLink } from 'react-router-dom';
import { toBase64 } from '../../../helper/utils';

const ProfileInfo = () => {
	const [baseImage, setBaseImage] = useState('');
	const activeUser = useSelector((state) => state.UserDuck.activeUser);
	const dispatch = useDispatch();
	const choosenPhoto = useRef(null);

	const choosePhoto = async (e) => {
		const file = e.target.files[0];
		const base64 = await toBase64(file);
		setBaseImage(base64);
	};

	const updatedUser = {
		...activeUser,
		profilePic: baseImage,
	};

	const uploadPhoto = () => {
		let id = activeUser.id;
		fetch(`${api}/users/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
			body: JSON.stringify(updatedUser),
		})
			.then((res) => res.json())
			.then((res) => {
				dispatch(setProfilePic(res));
			})
			.catch((err) => console.log(err));
	};

	const handleLogOut = () => {
		dispatch(setLoggedIn(false));
		dispatch(setActiveUser(null));
	};

	const inputFile = () => {
		choosenPhoto.current.click();
	};

	return (
		<div className='myProfile'>
			{activeUser.firstname === 'admin' ? (
				<h1>Hello our admin</h1>
			) : (
				<>
					<div className='profile-head'>
						<div className='photo-info'>
							<div className='profilePhoto'>
								<img
									className='photo'
									src={!baseImage ? activeUser.profilePic : baseImage}
									alt={'#'}
								/>
							</div>
							<input
								accept='image/*'
								style={{ display: 'none' }}
								type='file'
								onChange={(e) => choosePhoto(e)}
								id='contained-button-file'
								ref={choosenPhoto}
							/>
							<label htmlFor='contained-button-file'>
								<button className='button' onClick={inputFile}>
									Chosoe file
								</button>
							</label>
							<button className='button' onClick={uploadPhoto}>
								Upload
							</button>
						</div>
						<div className='about'>
							<h1>
								{activeUser.firstname} {activeUser.lastname}
							</h1>
							<div className='interests'>
								<h3 className='detaile-classes'>Interestes</h3>
								<div className='interests-items'>
									{activeUser.interests?.map((e) => (
										<span className='interests-item'>{e}</span>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className='going'>
						<h2 className='profile-list-name'>Interested Events</h2>
						<div className='profile-event-list'>
							{activeUser.interestedEvents.length > 0 ? (
								<>
									{activeUser.interestedEvents?.map((item) => (
										<ProfileEvent event={item} />
									))}
								</>
							) : (
								<h3 style={{ margin: '30px' }}>
									You dont't interested in some event, but you can{' '}
									<NavLink to={'/events'}>ADD</NavLink> it
								</h3>
							)}
						</div>
					</div>
					<div className='going'>
						<h2 className='profile-list-name'>Going Events</h2>
						<div className='profile-event-list'>
							{activeUser.going.length > 0 ? (
								<>
									{activeUser.going?.map((item) => (
										<ProfileEvent event={item} />
									))}
								</>
							) : (
								<h3 style={{ margin: '30px' }}>
									You dont't have any event for going, but you can{' '}
									<NavLink to={'/events'}>ADD</NavLink> it
								</h3>
							)}
						</div>
					</div>
					<div className='going'>
						<h2 className='profile-list-name'>Allready Gone</h2>
						<div className='profile-event-list'>
							{activeUser.allreadyGone.length > 0 ? (
								<>
									{activeUser.allreadyGone?.map((item) => (
										<ProfileEvent event={item} />
									))}
								</>
							) : (
								<h3 style={{ margin: '30px' }}>
									You never gone at any event with this platform, but you can{' '}
									<NavLink to={'/events'}>ADD</NavLink> it
								</h3>
							)}
						</div>
					</div>
				</>
			)}
			<button className='button' onClick={handleLogOut}>LogOut</button>
		</div>
	);
};

export default ProfileInfo;
