import { memo, useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { addFeedback } from '../../redux/ducks/feedbackDuck'
import { api } from '../../api.js'
import './index.css';
import { FaStar } from 'react-icons/fa';
const colors = {
	orange: '#471d1b',
	grey: '#a9a9a9',
};

const Feedback = () => {
	const [modal, setModal] = useState(false);
	const [currentValue, setCurrentValue] = useState(0);
	const [hoverValue, setHoverValue] = useState(undefined);
	const dispatch = useDispatch()

	const nameInput = useRef(null)
	const emailInput = useRef(null)
	const textInput = useRef(null)

	const stars = Array(5).fill(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		let today = new Date()
		let newFeedback = {
			sender: nameInput.current.value,
			email: emailInput.current.value,
			text: textInput.current.value,
			date: Date.now(),
			time: today.getHours() + ':' + today.getMinutes()
		}
		fetch(`${api}/feedbacks`, {
			method: "POST",
			body: JSON.stringify(newFeedback), headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => response.json())
			.then(json => {
				dispatch(addFeedback(json))
				setModal((value) => !value)
			})
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
	return (
		<div className='feedback'>
			{!modal && (
				<button className='toggle' onClick={() => setModal((value) => !value)}>
					Feedback
				</button>
			)}

			<div className='box'>
				{modal && (
					<form className='forms' action='' onSubmit={handleSubmit}>
						<button
							className='close-btn'
							onClick={() => setModal((value) => !value)}
						>
							X
						</button>

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

						<button className='submit'>SUBMIT FEEDBACK</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default memo(Feedback);
