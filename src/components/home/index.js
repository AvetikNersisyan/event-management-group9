import Search from './search/index';
import './index.css';
import Populiar from './populiar';
import Featured from './featured';
import Review from '../review';
const Home = () => {
  return (
    <div className='global-container'>
      <div className='search_wrapper'>
        <Search />;
      </div>
      <Populiar />
      <Featured />
      <Review />
    </div>
  );
};

export default Home;
