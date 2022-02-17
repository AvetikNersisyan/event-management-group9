import './footer.css';
import logo from '../../assets/img/logo.png';
import facebook from '../../assets/img/facebook.png';
import instagram from '../../assets/img/instagram.png';
import linkedin from '../../assets/img/linkedin.png';
import mail from '../../assets/img/mail.png';
import phone from '../../assets/img/phone.png';
import location from '../../assets/img/location.png';

const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <img src={logo} width={180} />

                <span>Company Name</span>
            </div>
            <div>
                <h3>About</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry’s standard dummy text ever
                    since the 1500s
                </p>
            </div>
            <div>
                <h3>Contuct Us</h3>
                <div>
                    <img className='icon' src={facebook} alt='icon' />
                    <img className='icon' src={instagram} alt='icon' />
                    <img className='icon' src={linkedin} alt='icon' />
                    <img className='icon' src={mail} alt='icon' />
                    <img className='icon' src={phone} alt='icon' />
                    <img className='icon' src={location} alt='icon' />
                </div>
            </div>
        </div>
    );
};

export default Footer;
