import Search from './search/index';
import './index.css';
/* import Populiar from './populiar';
 import Featured from './featured';
import Review from '../review';  */
import Feedback from '../feedback';
import Slider from './slider';
import Countdown from '../countdown';

import Categories from '../categories'

const Home = () => {
	return (
		<div /* className='global-container' */>
			{/* <div className='search_wrapper'>
				<Search />;
			</div> */}
			{/* <Populiar />
			<Featured />
			<Review />  */}
			<Categories />
			<Slider />
			<Countdown />


			<Feedback />
		</div>
	);
};

export default Home;
