import { NavLink } from 'react-router-dom';
import './index.css';

import { useState } from 'react';
import Logo from '../../assets/img/logo.png';
import { useSelector } from 'react-redux';

const Index = () => {
	const activeUser = useSelector((state) => state.UserDuck.activeUser);
	const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const handleClick = () => {
		setClick(!click);
	};
	const closeMobileMenu = () => {
		setClick(false);
	};

	const onMouseEnter = () => {
		setDropdown(true);
	};

	const onMouseLeave = () => {
		setDropdown(false);
	};

	return (
		<div className='container'>
			<div className={'scroll-fixed'}>
				<div className='navbar global-container'>
					<NavLink to='/' className='header-logo' onClick={closeMobileMenu}>
						<img className='header-logo' src={Logo} />
					</NavLink>
					<div className='menu-icon' onClick={handleClick}>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</div>

					<ul className={click ? 'nav-menu-active' : 'nav-menu'}>
						<li
							className='nav-item'
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
						>
							<NavLink to={'/'} className='nav-links' onClick={closeMobileMenu}>
								Home
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								to={'/events'}
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Events
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								to={'/profile'}
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Account
								{activeUser?.profilePic ? (
									<div className='header-profile-pic'>
										<img
											className='header-profile-img'
											src={activeUser?.profilePic}
										/>
									</div>
								) : (
									''
								)}
							</NavLink>
						</li>

						{activeUser?.type === 'admin' ? (
							<li className='nav-item'>
								<NavLink
									to={'/new-event'}
									className='nav-links'
									onClick={closeMobileMenu}
								>
									Add new Event <i className='fas fa-caret-down' />
								</NavLink>
							</li>
						) : (
							''
						)}
					</ul>
				</div>

				{/*<div className={'scroll-fixed'}>*/}
				{/*	<div className={'navbar'}>*/}
				{/*		<NavLink to={'/'}> Home </NavLink>*/}
				{/*		<NavLink to={'/events'}> Events </NavLink>*/}
				{/*		<NavLink to={'/profile'}> Profile </NavLink>*/}
				{/*		<NavLink to={'/categories'}> Categories </NavLink>*/}

				{/*		{true && (*/}
				{/*			<NavLink to={'/new-event'} className={'addEvent-btn btn'}>*/}
				{/*				{' '}*/}
				{/*				ADD EVENT{' '}*/}
				{/*			</NavLink>*/}
				{/*		)}*/}
			</div>
		</div>
	);
};

export default Index;
