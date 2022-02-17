import { useState } from 'react';
import './index.css';
import { FaStar } from 'react-icons/fa';
const colors = {
    orange: '#471d1b',
    grey: '#a9a9a9',
};

const Feedback = () => {
    const [modal, setModal] = useState(false);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [data, setData] = useState({
        name: '',
        email: '',
        feedback: '',
    });
    const stars = Array(5).fill(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setData({ ...data, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };
    const handleClick = (value) => {
        setCurrentValue(value);
    };
    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };
    return (
        <div className='feedback'>
            {!modal && (
                <button className='toggle' onClick={() => setModal((value) => !value)}>
                    Feedback
                </button>
            )}

            <div className='box'>
                {modal && (
                    <form className='forms' action='' onSubmit={handleSubmit}>
                        <button
                            className='close-btn'
                            onClick={() => setModal((value) => !value)}
                        >
                            X
                        </button>

                        <div>
                            <input
                                type='text'
                                className='active_input'
                                placeholder='YOUR NAME'
                                name='name'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <input
                                type='text'
                                name='email'
                                placeholder='YOUR E-MAIL'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div>
                            <input
                                className='msginput'
                                type='text'
                                placeholder='LEAVE YOUR MESSAGE'
                                name='feedback'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className='stars'>
                            <h3>Rate our service</h3>
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color={
                                            (hoverValue || currentValue) > index
                                                ? colors.orange
                                                : colors.grey
                                        }
                                    />
                                );
                            })}
                        </div>

                        <button className='submit'>SUBMIT FEEDBACK</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Feedback;
