import './footer.css';
import Iframe from 'react-iframe';
import logo from '../../assets/img/logo.png';
import facebook from '../../assets/img/facebook.png';
import instagram from '../../assets/img/instagram.png';
import linkedin from '../../assets/img/linkedin.png';
import mail from '../../assets/img/mail.png';
import phone from '../../assets/img/phone.png';
import location from '../../assets/img/location.png';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <div className='contacts'>
                <h2 className='title'>Contact Us</h2>
                <div className='contact_items'>
                    <div className='contact_item-info'>
                        <div className='contact_info'>
                            <img className='icon' src={location} alt='icon' />
                            <div className='info'> Yerevan, Armenia, Baghramyan 14</div>
                        </div>
                        <div class='contact_info'>
                            {' '}
                            <img className='icon' src={phone} alt='icon' />
                            <div className='info'>+374 (10) 11-11-11</div>
                        </div>
                        <div className='contact_info'>
                            {' '}
                            <img className='icon' src={phone} alt='icon' />
                            <div className='info'>+374 (91) 11-11-11</div>
                        </div>
                        <div className='contact_info'>
                            {' '}
                            <img className='icon' src={mail} alt='icon' />
                            <div className='info'> info@events.com</div>
                        </div>
                    </div>
                    <div class='contact_item-map'>
                        <Iframe
                            url='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.8162940368825!2d44.510153515389156!3d40.190901579392026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd1f2b141a7b%3A0xbdc90e63fc589ca6!2s14%20Marshal%20Baghramyan%20Ave%2C%20Yerevan%200019!5e0!3m2!1sen!2s!4v1645282013489!5m2!1sen!2s'
                            width='900 px'
                            height='650 px'
                            style='border:0;'
                            allow='fullscreen'
                            loading='lazy'
                        />
                    </div>
                </div>
            </div>
            <div className='footer_container'>
                <div className='footer'>
                    <div class='footer_top_item'>
                        <img src={logo} width={180} />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>

                    <div class='footer_top_item'>
                        <p class='footer_top_item_title'>Useful Links</p>
                        <ul id='nav_menu'>
                            <li>
                                <a href=''>Services</a>
                            </li>
                            <li>
                                <a href=''>About Us</a>
                            </li>
                            <li>
                                <a href=''>Help</a>
                            </li>
                        </ul>
                    </div>
                    <div class='footer_top_item'>
                        <p class='footer_top_item_title'>Follow Us</p>
                        <ul>
                            <li>
                                <a href='#'>
                                    {' '}
                                    Facebook <FaFacebook />
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    {' '}
                                    Instagram <FaInstagram />
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    {' '}
                                    Twitter <FaTwitter />
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    {' '}
                                    YouTube <FaYoutube />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='web_info'>All rights are preserved &copy; 2022</div>
            </div>
        </>
    );
};

export default Footer;
