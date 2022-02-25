import { memo, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../../redux/ducks/feedbackDuck';
import { api } from '../../api.js';
import feedback_img from '../../assets/img/feedback.png';
import './index.css';
import { FaStar } from 'react-icons/fa';
const colors = {
	orange: '#471d1b',
	grey: '#696969',
};

const Feedback = ({ activeUser }) => {
	const [currentValue, setCurrentValue] = useState(0);
	const [hoverValue, setHoverValue] = useState(undefined);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	const nameInput = useRef(null);
	const emailInput = useRef(null);
	const textInput = useRef(null);

	const stars = Array(5).fill(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		let today = new Date();
		let newFeedback = {
			sender: nameInput.current.value,
			email: emailInput.current.value,
			text: textInput.current.value,
			date: Date.now(),
			time: today.getHours() + ':' + today.getMinutes(),
		};
		fetch(`${api}/feedbacks`, {
			method: 'POST',
			body: JSON.stringify(newFeedback),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				dispatch(addFeedback(json));
				setIsOpen(false);
			});
	};

	const handleSubmitActive = (e) => {
		e.preventDefault();
		let today = new Date();
		let loggedInFeedback = {
			sender: activeUser?.firstname + ' ' + activeUser?.lastname,
			email: activeUser?.email,
			text: textInput.current.value,
			date: Date.now(),
			time: today.getHours() + ':' + today.getMinutes(),
		};
		fetch(`${api}/feedbacks`, {
			method: 'POST',
			body: JSON.stringify(loggedInFeedback),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				dispatch(addFeedback(json));
				setIsOpen(false);
			});
	};

	const handleClick = (value) => {
		setCurrentValue(value);
	};
	const handleMouseOver = (newHoverValue) => {
		setHoverValue(newHoverValue);
	};

	const handleMouseLeave = () => {
		setHoverValue(undefined);
	};
	const popupCloser = useCallback(() => setIsOpen(false), [isOpen]);

	const onOverlayClick = (e) => {
		e.target.className === 'background-popup' && popupCloser();
	};
	return (
		<div onClick={onOverlayClick} className='feedback'>
			{!isOpen ? (
				<img
					src={feedback_img}
					className='toggle'
					onClick={() => setIsOpen(true)}
				/>
			) : (
				''
			)}

			{isOpen ? (
				<div className='background-popup'>
					<div className='feedback-popup'>
						{!activeUser ? (
							<>
								<div>
									<input
										type='text'
										className='active_input'
										placeholder='YOUR NAME'
										name='name'
										ref={nameInput}
									/>
								</div>
								<div>
									<input
										type='text'
										name='email'
										placeholder='YOUR E-MAIL'
										ref={emailInput}
									/>
								</div>
							</>
						) : (
							<>
								<h4>
									from: {activeUser?.firstname + ' ' + activeUser?.lastname}
								</h4>
								<h4>email: {activeUser?.email}</h4>
							</>
						)}
						<div>
							<input
								className='msginput'
								type='text'
								placeholder='LEAVE YOUR MESSAGE'
								name='feedback'
								ref={textInput}
							/>
						</div>
						<div className='stars'>
							<h3>Rate our service</h3>
							{stars.map((_, index) => {
								return (
									<FaStar
										key={index}
										onClick={() => handleClick(index + 1)}
										onMouseOver={() => handleMouseOver(index + 1)}
										onMouseLeave={handleMouseLeave}
										color={
											(hoverValue || currentValue) > index
												? colors.orange
												: colors.grey
										}
									/>
								);
							})}
						</div>
						<button
							className='button'
							style={{ width: '200px' }}
							onClick={!activeUser ? handleSubmit : handleSubmitActive}
						>
							SUBMIT FEEDBACK
						</button>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default memo(Feedback);
