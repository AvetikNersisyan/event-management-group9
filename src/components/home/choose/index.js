import './index.css';
import homepic from '../../../assets/img/Home_img/Home_search_event.jpg';

const Choose = () => {
	return (
		<div className='about'>
			<h1 className='heading'>
				why choose <span>us</span>
			</h1>
			<div classname='row'>
				<div className='image'>
					<img src={homepic}></img>
				</div>
				<div className='content'>
					<h2>we are offering you the best</h2>
					<p>
						Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Ullam
						Labore Fugiat Ut Esse Perferendis Perspiciatis Provident Dolores
						Fuga In Facilis Culpa Possimus, Quia Praesentium Itaque, Sapiente
						Quasi Harum Rem Asperiores. Lorem, Ipsum Dolor Sit Amet Consectetur
						Adipisicing Elit. Fugiat Vero Expedita Incidunt Provident Quibusdam
						Aut Odit, Numquam Nesciunt Similique Nisi.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Choose;
