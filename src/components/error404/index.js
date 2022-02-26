import { NavLink } from 'react-router-dom';

import errorImageUrl from '../../assets/img/error.png';

import './index.css';

const Index = () => {
	return (
		<div className={'error-container'}>
			<h3>This link is broken, or has expired</h3>
			<img src={errorImageUrl} alt={'Error 404'} />
			<NavLink to={'/'}>
				<h1>Go to homepage </h1>
			</NavLink>
		</div>
	);
};

export default Index;
