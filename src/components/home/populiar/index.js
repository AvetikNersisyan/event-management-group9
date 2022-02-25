import "./index.css";
import concert from '../../../assets/img/Home_img/concert.jpg'
import cinema from '../../../assets/img/Home_img/cinema.jpg'
import presentation from '../../../assets/img/Home_img/presentation.jpg'
import sport from '../../../assets/img/Home_img/sport.jpg'
import { useNavigate } from "react-router-dom";

const Populiar = () => {
  const navigate = useNavigate();

  const handleCategory = (category) => {
    console.log(category);
    navigate('/events')
  }

  return (
    <>
      <section className="popular">
        <h2 className="section_title">Popular categories</h2>
        <div className="popular_content">
          <div className="popular_cart" onClick={() => handleCategory('ConcertSport')}>
            <h2>Concert</h2>
            <div className="popular-card-img">
              <img className="popular-img" src={concert} />
            </div>
          </div>
          <div className="popular_cart" onClick={() => handleCategory('Movie')}>
            <h2>Cinema</h2>
            <div className="popular-card-img">
              <img className="popular-img" src={cinema} />
            </div>
          </div>
          <div className="popular_cart" onClick={() => handleCategory('Presentation')}>
            <h2>Presentation</h2>
            <div className="popular-card-img">
              <img className="popular-img" src={presentation} />
            </div>
          </div>
          <div className="popular_cart" onClick={() => handleCategory('Sport')}>
            <h2>Sport</h2>
            <div className="popular-card-img">
              <img className="popular-img" src={sport} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Populiar;
