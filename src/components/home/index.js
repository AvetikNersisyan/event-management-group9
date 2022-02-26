import { useSelector } from 'react-redux';

import Populiar from './populiar';
import Featured from './featured';
import Slider from './slider';

import './index.css';

const Home = () => {
	const events = useSelector(({ EventDuck }) =>
		EventDuck.events.filter(({ img_url }) => img_url !== '')
	);

	return (
		<div className='home global-container' >
			<Slider events={events} />
			<Populiar />
			<Featured events={events} />
		</div>
	);
};

export default Home;
