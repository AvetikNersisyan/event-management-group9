import { NavLink } from 'react-router-dom';
import './index.css';

// eslint-disable-next-line no-unused-vars
import Dropdown from './Dropdown';
import { useState } from 'react';
import Logo from '../../assets/img/logo.png';

const Index = () => {
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
				<div className={'navbar'}>
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
								Home <i className='fas fa-caret-down' />
							</NavLink>
							{dropdown && <Dropdown />}
						</li>
						<li className='nav-item'>
							<NavLink
								to={'/events'}
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Events <i className='fas fa-caret-down' />
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								to={'/profile'}
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Profile <i className='fas fa-caret-down' />
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								to={'/categories'}
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Categories <i className='fas fa-caret-down' />
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								to={'/pages'}
								className='nav-links'
								onClick={closeMobileMenu}
							>
								Pages <i className='fas fa-caret-down' />
							</NavLink>
						</li>

						{true && (
							<li className='nav-item'>
								<NavLink
									to={'/new-event'}
									className='nav-links'
									onClick={closeMobileMenu}
								>
									Add new Event <i className='fas fa-caret-down' />
								</NavLink>
							</li>
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
