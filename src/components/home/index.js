import Search from './search/index';
import './index.css';
import Populiar from './populiar';
import Featured from './featured';
import Review from '../review';
const Home = () => {
  return (
    <>
      <div className='search_wrapper'>
        <Search />;
      </div>
      <Populiar />
      <Featured />
      <Review />
    </>
  );
};

export default Home;
