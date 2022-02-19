import Search from './search/index';
import './index.css';
import Populiar from './populiar';
import Featured from './featured';
import Review from '../review';
import Feedback from '../feedback';
import Slider from './slider';
const Home = () => {
	return (
		<div className='global-container'>
			<Slider />
			<div className='search_wrapper'>
				<Search />;
			</div>
			<Populiar />
			<Featured />
			<Review />
			<Feedback />
		</div>
	);
};

export default Home;
