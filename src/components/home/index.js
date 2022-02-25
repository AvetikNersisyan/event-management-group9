import './index.css';

import Feedback from '../feedback';
import Slider from './slider';
import Countdown from '../countdown';

const Home = () => {
	return (
		<div>
			<Slider />
			<Countdown />
			<Feedback />
		</div>
	);
};

export default Home;
