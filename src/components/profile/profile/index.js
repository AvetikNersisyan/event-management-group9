import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setActiveUser,
	setLoggedIn,
	setProfilePic,
} from '../../../redux/ducks/userDuck';
import { api } from '../../../api';
import ProfileEvent from './profileEvent';
import { NavLink } from 'react-router-dom';

const ProfileInfo = () => {
	const [baseImage, setBaseImage] = useState('');
	const activeUser = useSelector((state) => state.UserDuck.activeUser);
	const dispatch = useDispatch();

	const choosePhoto = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setBaseImage(base64);
	};

	const convertBase64 = (file) => {
		return new Promise((res, rej) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				res(fileReader.result);
			};

			fileReader.onerror = (error) => {
				rej(error);
			};
		});
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


	return (
		<div className='myProfile'>
			{activeUser.firstname === 'admin' ? (
				<div>Hello our admin</div>
			) : (
				<>
					<div className='profilePhoto'>
						<img
							className='photo'
							src={!baseImage ? activeUser.profilePic : baseImage}
							alt={'#'}
						/>
					</div>
					<div className='about'>
						<input type='file' onChange={(e) => choosePhoto(e)}></input>
						<button onClick={uploadPhoto}>Upload</button>

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
					<div className='going'>
						<p>Interested</p>

						{activeUser.interestedEvents.length > 0 ? (
							<div>
								{activeUser.interestedEvents?.map((item) => (
									<ProfileEvent event={item} />
								))}
							</div>
						) : (
							<h3>You dont't interested in some event, but you can <NavLink to={'/events'}>ADD</NavLink> it</h3>
						)}

					</div>
					<div className='going'>
						<p>Going</p>
						{activeUser.going.length > 0 ? (
							<>
								{activeUser.going?.map((item) => (
									<ProfileEvent event={item} />
								))}
							</>
						) : (
							<h3>You dont't have any event for going, but you can <NavLink to={'/events'}>ADD</NavLink> it</h3>
						)}
					</div>
					<div className='going'>
						<p>Allready gone</p>
						{activeUser.allreadyGone.length > 0 ? (
							<>
								{activeUser.allreadyGone?.map((item) => (
									<ProfileEvent event={item} />
								))}
							</>
						) : (
							<h3>
								You never gone at any event with this platform, but you can <NavLink to={'/events'}>ADD</NavLink> it
							</h3>
						)}
					</div>
				</>
			)}
			<button onClick={handleLogOut}>LogOut</button>
		</div>
	);
};

export default ProfileInfo;
