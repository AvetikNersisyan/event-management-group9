import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser, setLoggedIn, setProfilePic } from '../../../redux/ducks/userDuck';
import { api } from '../../../api'

const ProfileInfo = () => {
	const [baseImage, setBaseImage] = useState("")
	console.log(baseImage);

	const activeUser = useSelector((state) => state.UserDuck.activeUser)
	const dispatch = useDispatch();

	const choosePhoto = async (e) => {
		const file = e.target.files[0]
		const base64 = await convertBase64(file)
		setBaseImage(base64)
	}

	const convertBase64 = (file) => {
		return new Promise((res, rej) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				res(fileReader.result)
			}

			fileReader.onerror = (error) => {
				rej(error)
			}
		})
	}

	const uploadPhoto = () => {
		let id = activeUser.id
		fetch(`${api}/users/${id}`, {
			headers: {
				"Content-Type": "application/json"
			},
			method: 'PUT',
			body: JSON.stringify(baseImage)
		})
			.then(res => res.json())
			.then(res => {
				dispatch(setProfilePic(baseImage))
			})
			.catch(err => console.log(err))
	}

	const handleLogOut = () => {
		dispatch(setLoggedIn(false))
		dispatch(setActiveUser(null));
	};
	return (
		<div className='myProfile'>
			<div className='profilePhoto'>
				{/* {
					!activeUser.profilePic ?
						<div className='initials' >{activeUser?.firstname[0] + activeUser?.lastname[0]}</div>
						: */}
				<img className='photo' src={!baseImage ? activeUser.profilePic : baseImage} alt={'#'} />
				{/* } */}
			</div>
			<div className='about'>

				<input type="file" onChange={(e) => choosePhoto(e)}></input>
				<button onClick={uploadPhoto} >Upload</button>

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
