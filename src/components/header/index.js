import { NavLink } from 'react-router-dom';
import './index.css';
const Index = () => {
	return (
		<div className={'scroll-fixed'}>
			<div className={'navbar'}>
				<NavLink to={'/'}> Home </NavLink>
				<NavLink to={'/events'}> Events </NavLink>
				<NavLink to={'/profile'}> Profile </NavLink>
				<NavLink to={'/categories'}> Categories </NavLink>
			</div>
		</div>
	);
};
export default Index;
